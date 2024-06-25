import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RoleState = {
  roles: {
    id: number;
    name: string;
    guard_name: string;
  }[];
};

type RoleActions = {
  setRoles: (roles: RoleState['roles']) => void;
};

export const useRoleStore = create<RoleState & RoleActions>()(
  persist(
    (set) => ({
      roles: [],

      // Update state-------------------------------------
      setRoles: (roles) => set({ roles }),
    }),
    {
      name: 'roles',
    }
  )
);
