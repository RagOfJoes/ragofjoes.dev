import { IconType } from 'react-icons';
import { ImGithub, ImLinkedin2, ImTwitter } from 'react-icons/im';

export const ROUTES = [
  { href: '/', title: 'ABOUT' },
  { href: '/projects', title: 'PROJECTS' },
];

export const SOCIALS: { href: string; icon: IconType; title: string }[] = [
  {
    href: 'https://github.com/RagOfJoes',
    icon: ImGithub,
    title: 'GitHub',
  },
  {
    href: 'https://linkedin.com/RagOfJoes',
    icon: ImLinkedin2,
    title: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/RagOfJoes',
    icon: ImTwitter,
    title: 'Twitter',
  },
];
