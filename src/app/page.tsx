'use client';

import MyForm from '@/components/shared/ExampleForm';
import UserTable from '@/components/feature/UserTable';
import SwapyDemo from '@/components/feature/SwapyDemo';
import Calendar from '@/components/shared/Calendar';
import { authClient } from '@/auth/auth-client';
import { toastError, toastSuccess } from '@/utils/toast';
import CheckoutButton from '@/components/feature/CheckoutButton';
import SubscribeButton from '@/components/feature/SubscribeButton';
import { useCarsService } from '@/hooks/service/useCarsService';

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

  // Use the cars service hook instead of direct instantiation
  const { useGetAllCars, useContactSupport, useGenerateInvoicePdf } = useCarsService();

  // Get the query and refetch function at the component level
  const {
    data: carsData,
    isLoading: carsLoading,
    error: carsError,
    refetch: refetchCars,
  } = useGetAllCars();

  // Use mutation hooks
  const contactMutation = useContactSupport();
  const pdfMutation = useGenerateInvoicePdf();

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
    try {
      // Trigger a fresh data fetch
      const { data: freshData } = await refetchCars();

      if (freshData) {
        toastSuccess('Protected request success!');
        console.log(freshData);
      } else {
        throw new Error('No data received');
      }
    } catch (err) {
      toastError('Protected request failed');
      console.error(err);
    }
  };

  const sendEmail = async () => {
    try {
      const emailData = {
        name: 'a',
        email: 'a',
        subject: 'a',
        message: 'a',
      };

      // Use the mutation from the hook with proper handling
      await contactMutation.mutateAsync({
        emailData,
        lang: 'bg',
      });

      // Toast is handled by the mutation's onSuccess callback
      toastSuccess('Email sent successfully');
    } catch (error) {
      // Error is handled by the mutation's onError callback
      toastError('Failed to send email');
      console.error(error);
    }
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
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={sendEmail}
      >
        Send Email
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
