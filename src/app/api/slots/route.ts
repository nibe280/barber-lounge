import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const barbierId = searchParams.get("barbierId");

  if (!date || !barbierId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reservation")
    .select("creneau")
    .eq("date", date)
    .eq("barbierId", barbierId)
    .in("statut", ["confirmé", "en_attente"]);

  if (error) {
    console.error("❌ Supabase error in /api/slots:", error);
    return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
  }

  const bookedSlots = data.map((res: any) => res.creneau);
  return NextResponse.json(bookedSlots);
}
