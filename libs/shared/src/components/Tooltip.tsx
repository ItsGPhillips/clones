'use client';
import React, { ComponentProps, useRef } from 'react';
import { mergeProps, mergeRefs } from '@react-aria/utils';
import { cn } from '@shared/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { useTooltip, useTooltipTrigger } from '@react-aria/tooltip';
import {
  TooltipTriggerProps,
  TooltipTriggerState,
  useTooltipTriggerState,
} from '@react-stately/tooltip';
import { useElementSize } from 'usehooks-ts';

export const Tooltip: React.FC<
  ComponentProps<'div'> & {
    triggerState: TooltipTriggerState;
    triggerBounds: ReturnType<typeof useElementSize>[1];
  }
> = ({ triggerState, triggerBounds, ...props }) => {
  const { tooltipProps } = useTooltip(props, triggerState);

  return (
    <motion.div
      initial={{
        translateX: `calc(${triggerBounds.width / 2}px - 50%)`,
        opacity: 0,
        y: -5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -5,
      }}
      transition={{
        duration: 0.1,
        ease: 'easeInOut',
      }}
      className={cn(
        'pointer-events-none absolute !z-[9999] mt-3 rounded-md bg-neutral-500 p-2 text-xs whitespace-nowrap',
        props.className
      )}
      {...(tooltipProps as any)}
    >
      {props.children}
    </motion.div>
  );
};

export const TooltipContainer: React.FC<
  {
    children: React.ReactElement<any>;
    className?: string;
    tooltip: string;
  } & TooltipTriggerProps
> = ({ className, children, tooltip, ...props }) => {
  
  const ref = useRef<HTMLDivElement>(null);
  const [mref, bounds] = useElementSize();
  const state = useTooltipTriggerState(props);
  const { tooltipProps, triggerProps } = useTooltipTrigger(props, state, ref);

  const newProps = mergeProps(children.props, {
    ...triggerProps,
    ref: mergeRefs(mref, ref),
  });

  return (
    <div className={cn('relative', className)}>
      {React.cloneElement(children, newProps)}
      <AnimatePresence>
        {state.isOpen && (
          <Tooltip
            triggerState={state}
            {...tooltipProps}
            triggerBounds={bounds}
          >
            {tooltip}
          </Tooltip>
        )}
      </AnimatePresence>
    </div>
  );
};
