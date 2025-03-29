// Basic usage: https://better-auth.vercel.app/docs/basic-usage
//Admin and role management: https://better-auth.vercel.app/docs/plugins/admin

import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { ac, adminRole, userRole } from '@/auth/permissions';
export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [
    adminClient({
      ac: ac,
      roles: {
        ADMIN: adminRole,
        USER: userRole,
      },
    }),
  ],
});
