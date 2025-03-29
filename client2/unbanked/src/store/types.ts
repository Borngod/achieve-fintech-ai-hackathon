export interface StoreState {
  name: string;
  id: string;
  password: string;
  showPassword: boolean;
  setName: (name: string) => void;
  setId: (id: string) => void;
  setPassword: (password: string) => void;
  toggleShowPassword: () => void;
}