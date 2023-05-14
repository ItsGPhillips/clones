"use client";

import React from "react";
import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { ComponentProps } from 'react';

export const Root = (props: ComponentProps<typeof RadixScrollArea.Root>) => {
   return <RadixScrollArea.Root {...props}>{props.children}</RadixScrollArea.Root>;
};

export const Viewport = (props: ComponentProps<typeof RadixScrollArea.Viewport>) => {
   return (
      <RadixScrollArea.Viewport {...props}>{props.children}</RadixScrollArea.Viewport>
   );
};

export const Scrollbar = (props: ComponentProps<typeof RadixScrollArea.Scrollbar>) => {
   return <RadixScrollArea.Scrollbar  {...props}>{props.children}</RadixScrollArea.Scrollbar>;
};

export const Thumb = (props: ComponentProps<typeof RadixScrollArea.Thumb>) => {
   return (
      <RadixScrollArea.Thumb  {...props}>{props.children}</RadixScrollArea.Thumb>
   );
};

export const Corner = (props: ComponentProps<typeof RadixScrollArea.Corner>) => {
   return (
      <RadixScrollArea.Corner  {...props}>{props.children}</RadixScrollArea.Corner>
   );
};