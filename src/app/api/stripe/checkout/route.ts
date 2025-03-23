import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.items,
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
