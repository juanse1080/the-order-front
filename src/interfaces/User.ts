export type UserRoleCode = 'ADMIN' | 'WAITER' | 'CHEF';

export type UserLogged = {
  id: number;
  name: string;
  email: string;
  role_code: UserRoleCode;
  restaurant: {
    id: number;
    name: string;
  };
};
