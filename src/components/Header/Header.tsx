import { useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { TbMenu } from 'react-icons/tb/index';

import useWindowSize from '@/hooks/useWindowSize';
import { ROUTES, SOCIALS } from '@/lib/constants';

const opacity =
  'duration-120 ease-linear hover:opacity-100 opacity-40 transition';

export type HeaderProps = {
  url: URL;
};

const Header = (props: HeaderProps) => {
  const { url } = props;

  const [open, toggleOpen] = useState(false);

  // Animate height depending on scroll position
  const window = useWindowSize();
  const { scrollY } = useScroll({
    axis: 'y',
    offset: ['start end', 'end end'],
  });
  const height = useTransform(scrollY, [0, window.height], ['8rem', '6rem']);
  const popoverHeight = useMotionTemplate`calc(100vh - ${height})`;

  return (
    <header className="fixed inset-0 bottom-auto z-[9999]">
      <motion.nav
        style={{ height }}
        className={clsx(
          'duration-120 flex w-full border-b border-b-ctp-surface0 bg-ctp-base transition-[backdrop-filter,background-color] ease-linear will-change-[width,height] max-md:justify-between',
          !open && 'bg-transparent backdrop-blur-lg'
        )}
      >
        <div className="flex basis-1/3 items-center px-8 max-lg:basis-1/2">
          <a href="/" className={opacity}>
            V
          </a>
        </div>

        <div className="flex basis-2/3 max-lg:basis-1/4 max-md:hidden">
          <div className="flex basis-1/2 items-center justify-center gap-24 border-l border-l-ctp-surface0 px-8 max-lg:hidden max-lg:basis-1/3 max-lg:gap-12">
            {ROUTES.map((route) => (
              <a
                key={route.href}
                href={route.href}
                className={`${
                  route.href === url.pathname
                    ? 'text-ctp-blue opacity-100'
                    : opacity
                }`}
              >
                {route.title}
              </a>
            ))}
          </div>

          <div className="flex grow items-center justify-center gap-12 border-l border-l-ctp-surface0 px-8 max-lg:gap-10">
            {SOCIALS.map((link) => (
              <a
                target="_blank"
                key={link.href}
                href={link.href}
                className={opacity}
                rel="me noopener noreferrer"
                aria-label={`Go to my ${link.title} profile`}
              >
                {link.icon({})}
              </a>
            ))}
          </div>

          <div className="flex grow items-center justify-center gap-4 border-l border-l-ctp-surface0 px-8 max-lg:hidden">
            <a href="/Resume.pdf" className={opacity}>
              RESUME
            </a>
          </div>
        </div>

        <AnimatePresence>
          <Popover.Root
            modal
            open={open}
            onOpenChange={(newOpen) => toggleOpen(newOpen)}
          >
            <Popover.Trigger asChild>
              <button
                aria-label="Open navigation menu"
                className={clsx(
                  'hidden items-center justify-center gap-3 border-l border-l-ctp-surface0 bg-transparent px-8 py-0 max-lg:flex max-lg:basis-1/4',
                  opacity
                )}
              >
                <p>MENU</p>

                <TbMenu />
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.PopoverContent asChild>
                <motion.div
                  key="NavMobileMenu"
                  className="flex w-screen flex-col justify-center gap-24 overflow-y-auto bg-ctp-base p-8"
                  style={{ height: popoverHeight }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.12,
                  }}
                >
                  <div className="flex flex-col justify-center gap-8">
                    {ROUTES.map((route) => (
                      <a
                        key={route.href}
                        href={route.href}
                        className={clsx(
                          'text-center font-sans-serif text-4xl font-black',
                          route.href === url.pathname
                            ? 'text-ctp-blue opacity-100'
                            : opacity
                        )}
                      >
                        {route.title}
                      </a>
                    ))}

                    <a
                      href="/Resume.pdf"
                      className={`text-center font-sans-serif text-4xl font-black ${opacity}`}
                    >
                      RESUME
                    </a>
                  </div>

                  <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center justify-center gap-12 px-8">
                      {SOCIALS.map((link) => (
                        <a
                          target="_blank"
                          key={link.href}
                          href={link.href}
                          className={opacity}
                          rel="me noopener noreferrer"
                          aria-label={`Go to my ${link.title} profile`}
                        >
                          {link.icon({ size: 24 })}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Popover.PopoverContent>
            </Popover.Portal>
          </Popover.Root>
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Header;
