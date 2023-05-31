"use client";

import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { useBoolean } from "usehooks-ts";

export type CommentClientState = {
   isHovered: boolean;
};
const COMMENT_CONTEXT = createContext<CommentClientState | null>(null);

export const useCommentClientState = (): CommentClientState => {
   const ctx = useContext(COMMENT_CONTEXT);
   if (ctx === null) throw new Error("context was null");
   return ctx;
};

export const ClientStateProvider: React.FC<PropsWithChildren> = (props) => {
   const ref = useRef<HTMLDivElement>(null);
   const isHovered = useBoolean(false);
   return (
      <COMMENT_CONTEXT.Provider value={{ isHovered: isHovered.value }}>
         <div
            ref={ref}
            className="relative flex w-full items-start justify-start gap-4"
            onMouseOver={(e) => {
               e.stopPropagation();
               isHovered.setTrue();
            }}
            onMouseOut={(e) => {
               e.stopPropagation();
               isHovered.setFalse();
            }}
         >
            {props.children}
         </div>
      </COMMENT_CONTEXT.Provider>
   );
};
