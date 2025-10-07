import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";


export async function POST(_req: NextRequest) {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], 
      line_items: [
        priceId
          ? {
              price: priceId,
              quantity: 1,
            }
          : {
              price_data: {
                currency: "eur",
                product_data: {
                  name: "Pack Visionyze",
                  description: "Accès au contenu premium Visionyze",
                },
                unit_amount: 1999, 
              },
              quantity: 1,
            },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    console.log(session)
    console.log("Session Stripe créée:", session.id);
    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (error) {
    console.error("Erreur lors de la création de la session Stripe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
