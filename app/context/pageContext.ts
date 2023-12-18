import { Dispatch, SetStateAction, createContext, useContext } from 'react';

interface PageContext {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const PageContext = createContext<PageContext | null>(null);

export function usePageContext() {
  const pageContext = useContext(PageContext);

  if (pageContext === null) {
    throw new Error('usePageContext must be used inside PageContextProvider');
  }

  return pageContext;
}
