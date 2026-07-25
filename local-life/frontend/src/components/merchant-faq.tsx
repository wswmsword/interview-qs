import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types/merchant";

interface MerchantFaqProps {
  items: FaqItem[];
}

export function MerchantFaq({ items }: MerchantFaqProps) {
  return (
    <section aria-labelledby="faq-heading">
      <div className="mb-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink">
          Good to know
        </p>
        <h2
          id="faq-heading"
          className="text-2xl font-bold tracking-tight text-ink"
        >
          FAQ
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-2.5">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
