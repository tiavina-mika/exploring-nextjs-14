import { ReactNode } from 'react';

import { dehydrate } from '@tanstack/query-core';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
  children: ReactNode;
  queryClient: QueryClient;
};
const ReactQueryServerHydration = ({ children, queryClient }: Props) => {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default ReactQueryServerHydration;
