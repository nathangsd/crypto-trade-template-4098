import { useState, useEffect } from 'react';

interface HeadlineContent {
  headline: string;
  subheadline: string;
}

interface TrackingData {
  utmParams: Record<string, string | null>;
  abVariant: string;
  headlineContent: HeadlineContent;
}

declare global {
  interface Window {
    trackingData?: TrackingData;
    dataLayer?: any[];
  }
}

export const useABTesting = () => {
  const [headlineContent, setHeadlineContent] = useState<HeadlineContent>({
    headline: "Enquanto você demora para responder, seu concorrente já instalou a internet.",
    subheadline: "Com nossa IA, seus leads são atendidos no WhatsApp em segundos — 24h por dia, 7 dias por semana — sem precisar contratar mais atendentes."
  });
  
  const [variant, setVariant] = useState<string>('a');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkTrackingData = () => {
      if (window.trackingData) {
        setHeadlineContent(window.trackingData.headlineContent);
        setVariant(window.trackingData.abVariant);
        setIsLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkTrackingData, 100);
      }
    };

    checkTrackingData();
  }, []);

  const trackCheckoutClick = () => {
    if (window.dataLayer && variant) {
      window.dataLayer.push({
        'event': 'checkout_click',
        'headline_variant': variant
      });
    }
  };

  return {
    headlineContent,
    variant,
    isLoaded,
    trackCheckoutClick
  };
};