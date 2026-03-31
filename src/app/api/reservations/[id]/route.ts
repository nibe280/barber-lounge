import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { data: reservation, error } = await supabase
    .from("reservation")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
  return NextResponse.json(reservation);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const { data: reservation, error } = await supabase
    .from("reservation")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  return NextResponse.json(reservation);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { error } = await supabase
    .from("reservation")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  return NextResponse.json({ success: true });
}
