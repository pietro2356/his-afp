export type UserRole = 'DOC' | 'INF' | 'AMM';

export interface Staff {
  id: number;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface StaffDTO {
  id: number;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface UsernameCheck {
  available: boolean;
}

export interface CreateStaffRequest {
  username: string;
  password: string;
  role: UserRole;
}

export interface EditRoleRequest {
  role: UserRole;
}

export const UserRoleLabel: Record<UserRole, string> = {
  DOC: 'Medico',
  INF: 'Infermiere',
  AMM: 'Amministrativo',
};
