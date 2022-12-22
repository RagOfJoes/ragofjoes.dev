import {
  createContext as createSolidContext,
  useContext as useSolidContext,
  Context as SolidContext,
} from 'solid-js';

import { ContextProviderComponent } from 'solid-js/types/reactive/signal';

export type CreateContextArgs<T> = {
  defaultValue?: T | undefined;
  hookName?: string | undefined;
  errorMessage?: string | undefined;
  name: string;
  providerName?: string | undefined;
  strict?: boolean | undefined;
};

export type CreateContextReturn<T> = [
  ContextProviderComponent<T>,
  () => T,
  SolidContext<T>
];

export const createContext = <T>(
  args: CreateContextArgs<T>
): CreateContextReturn<T> => {
  const {
    defaultValue,
    strict = true,
    hookName = 'useContext',
    name,
    providerName = 'Provider',
    errorMessage,
  } = args;

  const Context = createSolidContext(defaultValue, { name });

  const useContext = () => {
    const context = useSolidContext(Context);

    if (!context && strict) {
      const error = new Error(
        errorMessage ??
          `${hookName} returned \`undefined\`. Must wrap component within ${providerName}`
      );

      error.name = 'ContextError';

      throw error;
    }

    return context;
  };

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
};
