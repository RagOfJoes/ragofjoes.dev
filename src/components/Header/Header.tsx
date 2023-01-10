import { createEffect, createSignal, For, Show } from 'solid-js';

import { Motion, Presence } from '@motionone/solid';
import type { Options } from '@motionone/solid';
import clsx from 'clsx';
import { HiSolidMenuAlt4, HiSolidX } from 'solid-icons/hi';

import Dialog, {
  DialogContainer,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from '../Dialog';
import Logo from '../Logo';
import type { HeaderProps } from './types';
import { useWindowScrollPosition } from '@/hooks/useWindowScrollPosition';
import { useWindowSize } from '@/hooks/useWindowSize';
import { ROUTES, SOCIALS } from '@/lib/constants';
import transform from '@/lib/transform';

const opacity = clsx(
  'duration-120 ease-linear opacity-40 transition',

  // Hover
  'hover:opacity-100'
);

const triggerVariant: Options = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.08,
  },
};

const isCurrentLink = (url: URL, slug: string): boolean => {
  const urlStripped = url.pathname.replaceAll('/', '');

  return urlStripped === slug;
};

const Header = (props: HeaderProps) => {
  const { url } = props;

  const [isOpen, toggleIsOpen] = createSignal(false);
  const [navHeight, setNavHeight] = createSignal(8);

  const size = useWindowSize();
  const scroll = useWindowScrollPosition();

  createEffect(() => {
    if (size.height === 0) {
      return;
    }

    const convert = transform([0, size.height], [8, 6]);
    const newHeight = convert(scroll.y);

    setNavHeight(newHeight);
  });

  return (
    <header
      class={clsx(
        'fixed inset-0 bottom-auto z-[9999] flex justify-center border-b border-b-ctp-surface0 bg-ctp-base transition-[backdrop-filter,background-color] ease-linear',

        {
          'bg-transparent backdrop-blur-lg': !isOpen(),
        }
      )}
    >
      <nav
        class={clsx(
          'duration-120 flex w-full will-change-[width,height]',

          // Medium Breakpoint
          'max-md:justify-between'
        )}
        style={{
          height: `${navHeight()}rem`,
        }}
      >
        <div
          class={clsx(
            'flex basis-1/3 items-center px-8',

            // Large Breakpoint
            'max-lg:basis-1/2'
          )}
        >
          <a href="/" class={opacity} aria-label="Go to home page">
            <Logo size={40} />
          </a>
        </div>

        <div
          class={clsx(
            'flex basis-2/3',

            // Large Breakpoint
            'max-lg:basis-1/4',
            // Medium Breakpoint
            'max-md:hidden'
          )}
        >
          <ul
            class={clsx(
              'flex basis-1/2 items-center justify-center gap-24 border-l border-l-ctp-surface0 px-8',

              // Large Breakpoint
              'max-lg:hidden max-lg:basis-1/3 max-lg:gap-12'
            )}
          >
            <For each={ROUTES}>
              {(route) => (
                <li class="flex items-center">
                  <a
                    href={route.href}
                    class={clsx(opacity, {
                      'text-ctp-blue opacity-100': isCurrentLink(
                        url,
                        route.slug
                      ),
                    })}
                  >
                    {route.title}
                  </a>
                </li>
              )}
            </For>
          </ul>

          <ul
            class={clsx(
              'flex grow items-center justify-center gap-12 border-l border-l-ctp-surface0 px-8',

              // Large Breakpoint
              'max-lg:gap-10'
            )}
          >
            <For each={SOCIALS}>
              {(link) => (
                <li class="flex items-center">
                  <a
                    target="_blank"
                    href={link.href}
                    class={opacity}
                    rel="me noopener noreferrer"
                    aria-label={`Go to my ${link.title} profile`}
                  >
                    {link.icon({})}
                  </a>
                </li>
              )}
            </For>
          </ul>

          <div
            class={clsx(
              'flex grow items-center justify-center border-l border-l-ctp-surface0 px-8',

              // Large Breakpoint
              'max-lg:hidden'
            )}
          >
            <a href="/Resume.pdf" class={opacity}>
              RESUME
            </a>
          </div>
        </div>

        <div
          class={clsx(
            'hidden border-l border-l-ctp-surface0',

            // Large Breakpoint
            'max-lg:flex max-lg:basis-1/4'
          )}
        >
          <Dialog
            onOpen={() => {
              document.body.style.cssText = 'overflow:hidden';
              toggleIsOpen(true);
            }}
            onClose={() => {
              document.body.style.cssText = '';

              toggleIsOpen(false);
            }}
          >
            <DialogTrigger
              aria-label="Open navigation menu"
              class={clsx(opacity, 'w-full')}
            >
              <Presence initial={false} exitBeforeEnter>
                <Show
                  when={isOpen()}
                  fallback={
                    <Motion.div
                      {...triggerVariant}
                      class="flex w-full items-center justify-center gap-2 bg-transparent px-8 py-0"
                    >
                      <p>MENU</p>

                      <HiSolidMenuAlt4 />
                    </Motion.div>
                  }
                >
                  <Motion.div
                    {...triggerVariant}
                    class="flex w-full items-center justify-center gap-2 bg-transparent px-8 py-0"
                  >
                    <p>CLOSE</p>

                    <HiSolidX />
                  </Motion.div>
                </Show>
              </Presence>
            </DialogTrigger>

            <DialogPortal>
              <DialogContainer
                class="fixed inset-0"
                style={{
                  transform: `translate3d(0, ${navHeight()}rem, 0)`,
                }}
              >
                <DialogContent
                  class={clsx('flex w-screen overflow-y-auto bg-ctp-base')}
                  style={{
                    height: `calc(100vh - ${navHeight()}rem)`,
                  }}
                >
                  <Presence initial={false} exitBeforeEnter>
                    <Show when={isOpen()}>
                      <Motion.div
                        class="my-auto flex w-screen flex-col justify-center gap-24 bg-ctp-base p-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.12,
                        }}
                      >
                        <ul class="flex flex-col items-center justify-center gap-8">
                          <For each={ROUTES}>
                            {(route) => (
                              <li class="flex items-center">
                                <a
                                  href={route.href}
                                  class={clsx(
                                    'text-center font-sans-serif text-4xl font-black',
                                    isCurrentLink(url, route.slug)
                                      ? 'text-ctp-blue opacity-100'
                                      : opacity
                                  )}
                                >
                                  {route.title}
                                </a>
                              </li>
                            )}
                          </For>

                          <li class="flex items-center">
                            <a
                              href="/Resume.pdf"
                              class={`text-center font-sans-serif text-4xl font-black ${opacity}`}
                            >
                              RESUME
                            </a>
                          </li>
                        </ul>

                        <div class="flex flex-col items-center gap-8">
                          <ul class="flex items-center justify-center gap-12 px-8">
                            <For each={SOCIALS}>
                              {(link) => (
                                <li class="flex items-center">
                                  <a
                                    target="_blank"
                                    href={link.href}
                                    class={opacity}
                                    rel="me noopener noreferrer"
                                    aria-label={`Go to my ${link.title} profile`}
                                  >
                                    {link.icon({ size: 24 })}
                                  </a>
                                </li>
                              )}
                            </For>
                          </ul>
                        </div>
                      </Motion.div>
                    </Show>
                  </Presence>
                </DialogContent>
              </DialogContainer>
            </DialogPortal>
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

export default Header;
