import {
  User as UserModel,
  CreatorData as CreatorDataModel,
  SupplierData as SupplierDataModel,
  Role as RoleModel,
} from '@prisma/client';

export interface IUser
  extends Omit<UserModel, 'password' | 'roleId' | 'createdAt' | 'updatedAt'> {
  role: RoleModel;
  creatorData?: CreatorDataModel;
  supplierData?: SupplierDataModel;
}

export interface RequestWithUser extends Request {
  userId: string;
  userRole: string;
}

