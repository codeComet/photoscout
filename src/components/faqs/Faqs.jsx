import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  return (
    <div className="py-24 bg-[#0a0f18]">
      <div className="w-[50%] mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I get started with searching images?</AccordionTrigger>
            <AccordionContent>
              You'll need to provide API keys for the platforms you want to search from (Unsplash, Pexels, etc.). Once configured, you can instantly search across all connected platforms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need API keys for all platforms?</AccordionTrigger>
            <AccordionContent>
              Yes, you'll need valid API keys for each platform you want to search from. This ensures you have proper access rights and can track your usage limits for each service.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Are there any usage limits?</AccordionTrigger>
            <AccordionContent>
              Usage limits depend on your API key's tier for each platform. For example, Unsplash offers 50 requests/hour on their free tier. We display your remaining quota for each platform to help you track usage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What happens if I reach my API limit?</AccordionTrigger>
            <AccordionContent>
              When you reach an API limit for a particular platform, that source will be temporarily unavailable until your quota resets. You can continue searching from other platforms where you still have available requests.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I manage my API keys?</AccordionTrigger>
            <AccordionContent>
              You can add, update, or remove API keys in your account settings. We securely store your keys and provide usage statistics to help you monitor your consumption across all platforms.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
