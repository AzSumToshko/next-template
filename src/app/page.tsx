'use client';

import MyForm from '@/components/shared/ExampleForm';
import UserTable from '@/components/feature/UserTable';
import SwapyDemo from '@/components/feature/SwapyDemo';
import Calendar from '@/components/shared/Calendar';
import { authClient } from '@/auth/auth-client';
import { toastError, toastSuccess } from '@/utils/toast';
import CheckoutButton from '@/components/feature/CheckoutButton';
import SubscribeButton from '@/components/feature/SubscribeButton';
import { images } from 'next/dist/build/webpack/config/blocks/images';

export default function Main() {
  const {
    data: session,
    // eslint-disable-next-line no-unused-vars
    isPending,
    // eslint-disable-next-line no-unused-vars
    error,
    // eslint-disable-next-line no-unused-vars
    refetch,
  } = authClient.useSession();

  const handleSignUp = async () => {
    // For more admin actions reffer to: https://better-auth.vercel.app/docs/plugins/admin
    const { data, error } = await authClient.signUp.email(
      {
        email: 'user@gmail.com',
        password: 'VeryStrong123123!',
        name: 'CrazyDev',
        // data: {
        //   Here you can add custom fields as well as the provided from better auth
        //   images: '',
        //   callbackURL: '/dashboard',
        // },
      },
      {
        // eslint-disable-next-line no-unused-vars
        onRequest: (ctx) => {
          // toastLoading(ctx.body.email);
        },
        onSuccess: (ctx) => {
          toastSuccess(ctx.data().email);
        },
        onError: (ctx) => {
          toastError(ctx.error.message);
        },
      }
    );

    console.log(data);
    console.log(error);
    console.log(session);
  };

  const handleSignUpAdmin = async () => {
    // For more admin actions reffer to: https://better-auth.vercel.app/docs/plugins/admin
    const { data, error } = await authClient.admin.createUser(
      {
        email: 'admin@gmail.com',
        password: 'Admin123123!',
        name: 'CrazyAdmin',
        role: 'ADMIN',
        // data: {
        //   Here you can add custom fields as well as the provided from better auth
        //   images: '',
        //   callbackURL: '/dashboard',
        // },
      },
      {
        // eslint-disable-next-line no-unused-vars
        onRequest: (ctx) => {
          // toastLoading(ctx.body.email);
        },
        onSuccess: (ctx) => {
          toastSuccess(ctx.data().email);
        },
        onError: (ctx) => {
          toastError(ctx.error.message);
        },
      }
    );

    console.log(data);
    console.log(error);
    console.log(session);
  };

  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email: 'user@gmail.com',
        /**
         * The user password
         */
        password: 'VeryStrong123123!',
        /**
         * a url to redirect to after the user verifies their email (optional)
         */
        // callbackURL: '/dashboard',
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        // eslint-disable-next-line no-unused-vars
        onRequest: (ctx) => {
          // toastLoading(ctx.body.email);
        },
        // eslint-disable-next-line no-unused-vars
        onSuccess: (ctx) => {
          toastSuccess('Logged in');
        },
        // eslint-disable-next-line no-unused-vars
        onError: (ctx) => {
          toastError('Error logging in');
        },
      }
    );

    console.log(data);
    console.log(error);
  };

  const handleSignInAdmin = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email: 'admin@gmail.com',
        /**
         * The user password
         */
        password: 'Admin123123!',
        /**
         * a url to redirect to after the user verifies their email (optional)
         */
        // callbackURL: '/dashboard',
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: true,
      },
      {
        // eslint-disable-next-line no-unused-vars
        onRequest: (ctx) => {
          // toastLoading(ctx.body.email);
        },
        // eslint-disable-next-line no-unused-vars
        onSuccess: (ctx) => {
          toastSuccess('Logged in');
        },
        // eslint-disable-next-line no-unused-vars
        onError: (ctx) => {
          toastError('Error logging in');
        },
      }
    );

    console.log(data);
    console.log(error);
  };

  const facebookSignIn = async () => {
    await authClient.signIn.social({
      provider: 'facebook',
      callbackURL: '/',
      errorCallbackURL: '/error',
      newUserCallbackURL: '/welcome',
      disableRedirect: false,
    });
  };

  const SignOut = async () => {
    await authClient.signOut();

    // await authClient.signOut({
    //   fetchOptions: {
    //     onSuccess: () => {
    //       router.push("/login"); // redirect to login page
    //     },
    //   },
    // });

    toastSuccess('Logged Out');
    console.log(session);
  };

  const callProtectedAPI = async () => {
    await authClient.getSession({
      fetchOptions: {
        onSuccess: async (ctx) => {
          const token = ctx.response.headers.get('set-auth-jwt');

          console.log(token);

          if (!token) {
            toastError('No token found in session');
            return;
          }

          try {
            const res = await fetch('http://localhost:8877/api/v1/cars', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Request failed');

            toastSuccess('Protected request success!');
            console.log(data);
          } catch (err) {
            toastError('Protected request failed');
            console.error(err);
          }
        },
      },
    });
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSignIn}
      >
        Sign In
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSignInAdmin}
      >
        Sign In Admin
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={facebookSignIn}
      >
        Facebook Login
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSignUpAdmin}
      >
        Sign Up Admin
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={SignOut}
      >
        Sign Out
      </button>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={callProtectedAPI}
      >
        Call Protected API
      </button>
      {/* To use testing card, get one from here: https://docs.stripe.com/testing#cards*/}
      <CheckoutButton />
      <SubscribeButton />
      <div>Hello From Help page</div>
      <MyForm />
      <h1>Swapy + MUI Demo</h1>
      <SwapyDemo />
      <Calendar />
      <UserTable />
    </>
  );
}
