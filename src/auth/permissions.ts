import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements, userAc } from 'better-auth/plugins/admin/access';

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  project: ['create', 'share', 'update', 'delete'],
} as const;

export const ac = createAccessControl(statement);

// eslint-disable-next-line no-unused-vars
export const userRole = ac.newRole({
  project: ['create'],
  ...userAc.statements,
});

// eslint-disable-next-line no-unused-vars
export const adminRole = ac.newRole({
  project: ['create', 'update'],
  ...adminAc.statements,
});
