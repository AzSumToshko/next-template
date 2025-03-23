'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Cool Product',
                images: [
                  'https://download.havecamerawilltravel.com/sample-images/webp/webp-example.webp',
                ],
              },
              unit_amount: 2999, // €29.99
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Cool Product',
                images: [
                  'https://download.havecamerawilltravel.com/sample-images/webp/webp-example.webp',
                ],
              },
              unit_amount: 2999, // €29.99
            },
            quantity: 1,
          },
        ],
      }),
    });

    const data = await res.json();

    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
    >
      Checkout with Stripe
    </button>
  );
}
