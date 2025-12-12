import { useLayoutEffect, useRef } from "react";

export const usePersistScroll = (
  containerRef: React.RefObject<HTMLDivElement>,
  key: string,
  shouldRestore: boolean
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    const savedPosition = sessionStorage.getItem(key);
    if (shouldRestore && savedPosition && containerRef.current) {
      containerRef.current.scrollTop = parseInt(savedPosition, 10);
    }
  }, [shouldRestore, key]);

  const onScroll = () => {
    if (!containerRef.current) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    const scrollTop = containerRef.current.scrollTop;
    
    timeoutRef.current = setTimeout(() => {
      sessionStorage.setItem(key, scrollTop.toString());
    }, 150);
  };

  return { onScroll };
};