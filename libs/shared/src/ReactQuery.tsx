'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  QueryKey,
  QueryObserverSuccessResult,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query';
import React, { PropsWithChildren, useState } from 'react';

export * from '@tanstack/react-query';
export * from '@tanstack/react-query-devtools';

/**
 * Client side wrapper for react queries cache.
 * @param props
 * @returns
 */
export const ClientReactQueryProvider: React.FC<PropsWithChildren> = (
  props
) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
};

/**
 * https://github.com/TanStack/query/issues/2306#issuecomment-1114049260
 */

export type SuspenseQueryObserverResult<
  TData = unknown,
  TError = unknown
> = QueryObserverSuccessResult<TData, TError>;
export type UseSuspenseBaseQueryResult<TData, TError> =
  SuspenseQueryObserverResult<TData, TError>;

export type UseSuspenseQueryResult<
  TData = unknown,
  TError = unknown
> = UseSuspenseBaseQueryResult<TData, TError>;

export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
      suspense: true;
    },
    'queryKey' | 'queryFn'
  >
): UseSuspenseQueryResult<TData, TError> {
  return useQuery(
    queryKey,
    queryFn,
    options
  ) as unknown as UseSuspenseQueryResult<TData, TError>;
}
