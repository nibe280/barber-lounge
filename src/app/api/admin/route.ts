import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Erreur database" }, { status: 500 });
  }

  return NextResponse.json(reservations || []);
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id, statut } = await req.json();
  const { data: reservation, error } = await supabase
    .from('reservation')
    .update({ statut })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }

  return NextResponse.json(reservation);
}