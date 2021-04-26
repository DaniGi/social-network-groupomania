import { useRef, useEffect, useCallback, useState } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : {};

export const useScrollBlock = () => {
  // when scroll is blocked, the width of the home page changes, and so does the width of the card (width: 100%).
  // To avoid seeing the card changing width when it becomes visible this state block its first rendering
  const [isScrollBlocked, SetIsScrollBlocked] = useState(false);
  const scrollBlocked = useRef();
  const html = safeDocument.documentElement;
  const { body } = safeDocument;

  const blockScroll = useCallback(() => {
    if (!body || !body.style || scrollBlocked.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(window.getComputedStyle(body).getPropertyValue('padding-right'), 10) || 0;

    html.style.position = 'relative';
    html.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scrollBlocked.current = true;
  }, [body, html.clientWidth, html.style]);

  const allowScroll = useCallback(() => {
    if (!body || !body.style || !scrollBlocked.current) return;

    html.style.position = '';
    html.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    scrollBlocked.current = false;
  }, [body, html.style]);

  // Blocking scroll on component mount, allowing scroll on component unmount
  useEffect(() => {
    blockScroll();
    SetIsScrollBlocked(true);
    return () => {
      allowScroll();
      SetIsScrollBlocked(false);
    };
  }, [blockScroll, allowScroll]);

  return [isScrollBlocked];
};
