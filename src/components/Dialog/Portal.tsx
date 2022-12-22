import { Show } from 'solid-js';

import { Portal as SolidPortal } from 'solid-js/web';

import { useDialogContext } from './Context';
import { DialogPortalProps } from './types';

const Portal = (props: DialogPortalProps) => {
  const { api } = useDialogContext();

  return (
    <Show when={api().isOpen}>
      <SolidPortal>{props.children}</SolidPortal>
    </Show>
  );
};

export default Portal;
