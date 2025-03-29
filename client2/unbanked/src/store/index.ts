import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StoreState } from './types';

const useStoreLogin = create<StoreState>()(
  persist(
    (set) => ({
      name: '',
      id: '',
      password: '',
      showPassword: false,
      setName: (name) => set({ name }),
      setId: (id) => set({ id }),
      setPassword: (password) => set({ password }),
      toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
    }),
    {
      name: 'login-signup-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStoreLogin;