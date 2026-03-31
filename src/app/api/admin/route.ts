import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { supabase } from "@/lib/supabase";
=======
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

>>>>>>> origin/main
export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
<<<<<<< HEAD
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select('*')
    .order('createdAt', { ascending: false });
  
  if (error) {
    return NextResponse.json({ error: "Erreur database" }, { status: 500 });
  }

  return NextResponse.json(reservations || []);
=======
  // TODO: Replace with Supabase query to fetch reservations
  // const { data: reservations, error } = await supabase.from('reservation').select('*').order('createdAt', { ascending: false });
  const reservations: any[] = [];
  return NextResponse.json(reservations);
>>>>>>> origin/main
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id, statut } = await req.json();
<<<<<<< HEAD
  const { data: reservation, error } = await supabase
    .from('reservation')
    .update({ statut })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }

=======
  // TODO: Replace with Supabase query to update reservation
  // const { data: reservation, error } = await supabase.from('reservation').update({ statut }).eq('id', id).select();
  const reservation = null;
>>>>>>> origin/main
  return NextResponse.json(reservation);
}