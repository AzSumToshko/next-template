'use client';

import MyForm from '@/components/shared/ExampleForm';
import UserTable from '@/components/feature/UserTable';
import SwapyDemo from '@/components/feature/SwapyDemo';
import Calendar from '@/components/shared/Calendar';
import { authClient } from '@/utils/auth-client';
import { toastError, toastLoading, toastSuccess } from '@/utils/toast';

export default function Main() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email: 'testtest@test.com',
        password: 'VeryStrong123123!',
        name: 'CrazyDev',
        // image,
        // callbackURL: "/dashboard"
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
        email: 'testtest@test.com',
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
        onClick={SignOut}
      >
        Sign Out
      </button>
      <div>Hello From Help page</div>
      <MyForm />
      <h1>Swapy + MUI Demo</h1>
      <SwapyDemo />
      <Calendar />
      <UserTable />
    </>
  );
}
