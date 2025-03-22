// This file needs to be in either lib or utils folder
// setup guide https://better-auth.vercel.app/docs/adapters/postgresql
// How to add facebook provider: https://better-auth.vercel.app/docs/authentication/facebook
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
  database: new Pool({
    connectionString: 'postgres://postgres:Admin123123!@localhost:5432/CarzUpBlog',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },
});
