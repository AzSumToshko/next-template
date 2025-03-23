'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscribeButton() {
  const handleSubscribe = async () => {
    const res = await fetch('/api/stripe/subscribe', {
      method: 'POST',
    });

    const data = await res.json();
    const stripe = await stripePromise;

    if (data?.id) {
      stripe?.redirectToCheckout({ sessionId: data.id });
    } else {
      alert('Subscription error');
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
    >
      Subscribe to Pro Plan
    </button>
  );
}
