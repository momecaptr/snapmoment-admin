import { ModalKey } from '@/shared/lib/hooks/useModal';

export interface AppSettings {
  isPhotoInState: boolean;
  modal: Modal;
  theme: Theme;
}
export type Theme = 'moon' | 'sun';

export interface Modal {
  isOpen: boolean;
  modalKey: ModalKey[];
}