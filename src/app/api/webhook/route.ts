import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { Stripe } from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Signature manquante ou clé secrète non configurée" },
        { status: 400 }
      );
    }
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Erreur de signature webhook:", err);
      return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === "paid") {
        await prisma.payment.upsert({
          where: { stripeSessionId: session.id },
          update: {
            amount: session.amount_total || 0,
            currency: session.currency || "eur",
            status: session.payment_status,
            customerEmail: session.customer_details?.email,
          },
          create: {
            stripeSessionId: session.id,
            amount: session.amount_total || 0,
            currency: session.currency || "eur",
            status: session.payment_status,
            customerEmail: session.customer_details?.email,
          },
        });

        console.log(`Paiement enregistré pour la session ${session.id}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur lors du traitement du webhook:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement du webhook" },
      { status: 500 }
    );
  }
}
