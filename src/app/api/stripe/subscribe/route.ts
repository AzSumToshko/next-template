import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1R5m2zPaHeXO66gs8Jn1TL5s', // ✅ Replace with your actual price ID
          quantity: 1,
        },
      ],

      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Stripe subscription error:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
