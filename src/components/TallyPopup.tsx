import { useEffect } from "react";

export const useTallyPopup = () => {
  const openTallyPopup = () => {
    // Load Tally script if not already loaded
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Trigger popup opening
    setTimeout(() => {
      // This would typically trigger the Tally popup
      // Add your specific Tally popup logic here based on your form ID
      console.log('Tally popup should open here');
    }, 100);
  };

  return { openTallyPopup };
};