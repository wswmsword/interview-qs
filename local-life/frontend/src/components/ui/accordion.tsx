"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CaretDownIcon } from "@phosphor-icons/react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-lg border border-line bg-white px-4 transition-colors data-[state=open]:border-brand",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold text-ink outline-none transition-colors hover:text-brand-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-brand-ink",
          className,
        )}
        {...props}
      >
        {children}
        <CaretDownIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted transition-transform"
          weight="bold"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm will-change-[height,opacity]"
      {...props}
    >
      <div
        className={cn(
          "max-w-3xl pb-5 pr-8 leading-7 text-muted",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
