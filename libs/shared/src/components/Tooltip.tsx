'use client';

import React, { ComponentProps } from 'react';
import * as RadixToolip from '@radix-ui/react-tooltip';
import { cn } from '../utils/cn';

/**
 * Wraps all the radix components and makes them client components
 */

export const Provider: React.FC<ComponentProps<typeof RadixToolip.Provider>> = (
  props
) => {
  return (
    <RadixToolip.Provider {...props}>{props.children}</RadixToolip.Provider>
  );
};

export const Root: React.FC<
  ComponentProps<typeof RadixToolip.Root> & {
    tooltip: React.ReactNode;
    defaultTooltip?: boolean;
  }
> = ({ tooltip, defaultTooltip, ...props }) => {
  return (
    <RadixToolip.Root {...props}>
      {props.children}
      <Content tooltip={tooltip} defaultTooltip={defaultTooltip} />
    </RadixToolip.Root>
  );
};

export const Trigger: React.FC<ComponentProps<typeof RadixToolip.Trigger>> = (
  props
) => {
  return <RadixToolip.Trigger {...props}>{props.children}</RadixToolip.Trigger>;
};

export const Portal = (props: ComponentProps<typeof RadixToolip.Portal>) => {
  return (
    <RadixToolip.Portal container={document.body} {...props}>
      {props.children}
    </RadixToolip.Portal>
  );
};

export const Content: React.FC<
  Omit<ComponentProps<typeof RadixToolip.Content>, 'children' | 'asChild'> & {
    tooltip: React.ReactNode;
    defaultTooltip?: boolean;
  }
> = (props) => {
  if (props.defaultTooltip) {
    return (
      <RadixToolip.Content {...props} asChild>
        <div
          className={cn(
            'relative !z-[9999] mt-3 rounded-md bg-neutral-500 p-2 text-xs',
            'animate-in fade-in-10'
          )}
        >
          {props.tooltip}
        </div>
      </RadixToolip.Content>
    );
  }
  return <>{props.tooltip}</>;
};
