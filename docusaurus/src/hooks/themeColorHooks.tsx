import { useColorMode } from '@docusaurus/theme-common';

export const useBgColor = (): string => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? 'bg-theme-dark-primary' : 'bg-theme-light-primary';
};

export const useHeroTextColor = (): string => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? 'text-black' : 'text-white';
};

export const useTextColor = (): string => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? 'text-white' : 'text-black';
};
