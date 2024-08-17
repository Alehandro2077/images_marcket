import { User as UserModel } from '@prisma/client';

import { omit } from 'lodash';

import { IUser } from '../interfaces/user.interface';

export const formatUserData = (userData: UserModel, role: string) => {
  const formatedUser = omit(userData, [
    'password',
    'roleId',
    'createdAt',
    'updatedAt',
  ]) as IUser;

  if (formatedUser.role.role === 'creator') {
    delete formatedUser.supplierData;
  } else if (formatedUser.role.role === 'supplier') {
    delete formatedUser.creatorData;
  }
  delete formatedUser.role;

  return { ...formatedUser, role };
};
