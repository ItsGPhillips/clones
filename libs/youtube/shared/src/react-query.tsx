"use client";

import React from "react";''
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useMemo } from "react";
export * from "@tanstack/react-query";
export * from "@tanstack/react-query-devtools";

export const ReactQueryProvider: React.FC<PropsWithChildren> = (props) => {
   const client = useMemo(() => new QueryClient(), []);
   return (
      <QueryClientProvider client={client}>
         {props.children}
      </QueryClientProvider>
   );
};
