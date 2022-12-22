import { UseDialog } from './types';
import { createContext } from '@/lib/createContext';

export const [DialogProvider, useDialogContext] = createContext<UseDialog>({
  strict: true,
  name: 'DialogContext',
});
