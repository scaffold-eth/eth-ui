import { useIsMounted } from 'test-usehooks-ts';

export const useCheckIsMounted = (): void => {
  const data = useIsMounted();
  if (data()) {
    console.log('is mounted');
  } else {
    console.log('not mounted');
  }
};
