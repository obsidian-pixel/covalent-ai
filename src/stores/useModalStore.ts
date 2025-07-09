import { create } from 'zustand';

interface ModalState {
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'signup' | null; // To potentially differentiate if needed later
  openAuthModal: (type?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAuthModalOpen: false,
  authModalType: null,
  openAuthModal: (type = 'signup') => set({ isAuthModalOpen: true, authModalType: type }),
  closeAuthModal: () => set({ isAuthModalOpen: false, authModalType: null }),
}));
