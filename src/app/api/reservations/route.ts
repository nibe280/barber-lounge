import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { supabase } from "@/lib/supabase";
=======
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
>>>>>>> origin/main
import { Resend } from "resend";



export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();

    const {
      serviceId, serviceNom, servicePrix,
      barbierId, barbierNom,
      date, creneau,
      prenom, nom, tel, email,
    } = body;

    if (!serviceNom || !barbierNom || !date || !creneau || !prenom || !nom || !tel || !email) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }


<<<<<<< HEAD
    const { data: existing, error: fetchError } = await supabase
=======

    // Check for existing reservation with same date, creneau, barbierId, and statut 'confirmé'
    const { data: existing, error: existingError } = await supabase
>>>>>>> origin/main
      .from('reservation')
      .select('*')
      .eq('date', date)
      .eq('creneau', creneau)
      .eq('barbierId', barbierId)
<<<<<<< HEAD
      .in('statut', ['confirmé', 'en_attente'])
      .maybeSingle();
=======
      .eq('statut', 'confirmé')
      .maybeSingle();
    if (existingError) {
      return NextResponse.json({ error: 'Erreur lors de la vérification des réservations existantes' }, { status: 500 });
    }

>>>>>>> origin/main

    if (existing) {
      return NextResponse.json({ error: "Ce créneau est déjà réservé" }, { status: 409 });
    }


<<<<<<< HEAD
  const { data: reservation, error: insertError } = await supabase
    .from('reservation')
    .insert([{ serviceId, serviceNom, servicePrix, barbierId, barbierNom, date, creneau, prenom, nom, tel, email }])
    .select()
    .single();

  if (insertError) {
    console.error("❌ Erreur d'insertion Supabase:", insertError);
    return NextResponse.json({ error: "Erreur lors de la création de la réservation" }, { status: 500 });
  }

  if (!reservation) {
    console.warn("⚠️ Réservation insérée avec succès mais aucune donnée retournée. Vérifiez vos politiques RLS SELECT.");
=======

  // Create reservation in Supabase
  const { data: reservation, error: createError } = await supabase
    .from('reservation')
    .insert([
      { serviceId, serviceNom, servicePrix, barbierId, barbierNom, date, creneau, prenom, nom, tel, email, statut: 'confirmé' }
    ])
    .select()
    .maybeSingle();
  if (createError) {
    return NextResponse.json({ error: 'Erreur lors de la création de la réservation' }, { status: 500 });
>>>>>>> origin/main
  }

    const dateLabel = new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });

<<<<<<< HEAD
  console.log("✅ Réservation créée:", reservation?.id);
    console.log("🔑 RESEND_API_KEY présente:", !!process.env.RESEND_API_KEY);
=======

  console.log("✅ Réservation créée:", reservation?.id);
  console.log("🔑 RESEND_API_KEY présente:", !!process.env.RESEND_API_KEY);
>>>>>>> origin/main

    // Email au client
    try {
      const emailClient = await resend.emails.send({
        from: "Barber Lounge <onboarding@resend.dev>",
        to: "beni_tukalayengemiantuila@ens.univ-artois.fr",
        subject: "✅ Votre réservation est confirmée — Barber Lounge",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a08; color: #ffffff; padding: 40px; border-radius: 12px;">
            <h1 style="color: #e8d44d; font-size: 24px; margin-bottom: 8px;">Réservation confirmée ✦</h1>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 32px;">Bonjour ${prenom}, votre rendez-vous a bien été enregistré.</p>
            <div style="background: #1a1a1a; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #2a2a2a;">
                  <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Service</td>
                  <td style="padding: 12px 0; color: #ffffff; font-weight: 600; text-align: right;">${serviceNom}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2a2a2a;">
                  <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Barbier</td>
                  <td style="padding: 12px 0; color: #ffffff; font-weight: 600; text-align: right;">${barbierNom}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2a2a2a;">
                  <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Date</td>
                  <td style="padding: 12px 0; color: #ffffff; font-weight: 600; text-align: right;">${dateLabel}</td>
                </tr>
                <tr style="border-bottom: 1px solid #2a2a2a;">
                  <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Heure</td>
                  <td style="padding: 12px 0; color: #ffffff; font-weight: 600; text-align: right;">${creneau}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Prix</td>
                  <td style="padding: 12px 0; color: #e8d44d; font-weight: 700; text-align: right;">${servicePrix}€</td>
                </tr>
              </table>
            </div>
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-align: center;">
              Code : <strong style="color: rgba(255,255,255,0.6);">RDV-${reservation ? reservation.id?.slice(-6).toUpperCase() : "XXXXXX"}</strong>
            </p>
          </div>
        `,
      });
      console.log("📧 Email client result:", JSON.stringify(emailClient));
    } catch (emailError) {
      console.error("❌ Erreur email client:", emailError);
    }

    // Email au barbier
    try {
      const emailBarbier = await resend.emails.send({
        from: "Barber Lounge <onboarding@resend.dev>",
        to: "beni_tukalayengemiantuila@ens.univ-artois.fr",
        subject: `📅 Nouveau RDV — ${prenom} ${nom} — ${dateLabel} à ${creneau}`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
            <h2>Nouveau rendez-vous</h2>
            <p><strong>Client :</strong> ${prenom} ${nom}</p>
            <p><strong>Téléphone :</strong> ${tel}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Service :</strong> ${serviceNom} (${servicePrix}€)</p>
            <p><strong>Barbier :</strong> ${barbierNom}</p>
            <p><strong>Date :</strong> ${dateLabel} à ${creneau}</p>
          </div>
        `,
      });
      console.log("📧 Email barbier result:", JSON.stringify(emailBarbier));
    } catch (emailError) {
      console.error("❌ Erreur email barbier:", emailError);
    }

    return NextResponse.json({ success: true, reservation }, { status: 201 });

  } catch (error) {
    console.error("❌ Erreur réservation:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data: reservations, error } = await supabase
      .from('reservation')
      .select('*')
      .order('createdAt', { ascending: false });
<<<<<<< HEAD

    if (error) {
       console.error("❌ Erreur fetch réservations:", error);
       return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    return NextResponse.json(reservations || []);
=======
    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des réservations' }, { status: 500 });
    }
    return NextResponse.json(reservations);
>>>>>>> origin/main
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}