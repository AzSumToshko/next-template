// This file needs to be in either lib or utils folder
// setup guide https://better-auth.vercel.app/docs/adapters/postgresql
// How to add facebook provider: https://better-auth.vercel.app/docs/authentication/facebook
// Admin and role management here: https://better-auth.vercel.app/docs/plugins/admin

import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { admin, jwt } from 'better-auth/plugins';
import { ac, adminRole, userRole } from '@/auth/permissions';

export const auth = betterAuth({
  plugins: [
    jwt(),
    admin({
      ac: ac,
      roles: {
        ADMIN: adminRole,
        USER: userRole,
      },
      adminRoles: ['ADMIN'],
      defaultRole: 'USER',
      impersonationSessionDuration: 60 * 60 * 24,
    }),
  ],
  database: new Pool({
    connectionString: 'postgres://postgres:Admin123123!@localhost:5432/TestDB',
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
