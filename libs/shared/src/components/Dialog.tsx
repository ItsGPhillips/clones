"use client";

import React from "react"
import * as RadixDialog from '@radix-ui/react-dialog';
import { ComponentProps } from 'react';

export const Root = (props: ComponentProps<typeof RadixDialog.Root>) => {
   return <RadixDialog.Root {...props}>{props.children}</RadixDialog.Root>;
};

export const Trigger = (props: ComponentProps<typeof RadixDialog.Trigger>) => {
   return (
      <RadixDialog.Trigger {...props}>{props.children}</RadixDialog.Trigger>
   );
};

export const Portal = (props: ComponentProps<typeof RadixDialog.Portal>) => {
   return <RadixDialog.Portal {...props}>{props.children}</RadixDialog.Portal>;
};

export const Overlay = (props: ComponentProps<typeof RadixDialog.Overlay>) => {
   return (
      <RadixDialog.Overlay {...props}>{props.children}</RadixDialog.Overlay>
   );
};

export const Content = (props: ComponentProps<typeof RadixDialog.Content>) => {
   return (
      <RadixDialog.Content {...props}>{props.children}</RadixDialog.Content>
   );
};

export const Background = (props: ComponentProps<typeof RadixDialog.Overlay>) => {
   return (
      <RadixDialog.Overlay {...props}>{props.children}</RadixDialog.Overlay>
   );
};
