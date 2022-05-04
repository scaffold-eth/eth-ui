import { useColorMode } from '@docusaurus/theme-common';

export const useBgColor = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? 'bg-theme-dark-primary' : 'bg-theme-light-primary';
};

export const useHeroTextColor = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? 'text-black' : 'text-white';
};

export const useTextColor = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? 'text-white' : 'text-black';
};
