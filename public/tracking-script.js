// UTM Tracking and A/B Testing Script
(function() {
  'use strict';

  // UTM Parameters Tracking
  function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content')
    };
    return utmParams;
  }

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Store UTM parameters in cookies
  function storeUTMParameters() {
    const utmParams = getUTMParameters();
    let hasUTM = false;

    Object.keys(utmParams).forEach(key => {
      if (utmParams[key]) {
        setCookie(key, utmParams[key], 90);
        hasUTM = true;
      }
    });

    // If no UTM parameters in URL, check for existing cookies
    if (!hasUTM) {
      Object.keys(utmParams).forEach(key => {
        const cookieValue = getCookie(key);
        if (cookieValue) {
          utmParams[key] = cookieValue;
        }
      });
    }

    return utmParams;
  }

  // A/B Testing for Headlines
  function getABTestVariant() {
    let variant = getCookie('ab_headline_variant');
    
    if (!variant) {
      // First time visitor - randomly assign variant
      const variants = ['a', 'b', 'c'];
      variant = variants[Math.floor(Math.random() * variants.length)];
      setCookie('ab_headline_variant', variant, 90);
    }
    
    return variant;
  }

  function getHeadlineContent(variant) {
    const headlines = {
      a: {
        headline: "Enquanto você demora para responder, seu concorrente já instalou a internet.",
        subheadline: "Com nossa IA, seus leads são atendidos no WhatsApp em segundos — 24h por dia, 7 dias por semana — sem precisar contratar mais atendentes."
      },
      b: {
        headline: "Seus clientes não podem esperar. Nossa IA não os faz esperar.",
        subheadline: "Atendimento inteligente no WhatsApp que converte leads em clientes 24/7, enquanto sua concorrência ainda está dormindo."
      },
      c: {
        headline: "Pare de perder vendas por demora no atendimento.",
        subheadline: "IA especializada em provedores de internet que qualifica leads e agenda instalações automaticamente via WhatsApp."
      }
    };
    
    return headlines[variant] || headlines.a;
  }

  // Add headline parameter to checkout URLs
  function addHeadlineToCheckout() {
    const variant = getABTestVariant();
    
    // Find all buttons that should go to checkout
    const checkoutButtons = document.querySelectorAll('[data-checkout-button]');
    
    checkoutButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Add headline parameter to URL or form data
        if (typeof window.dataLayer !== 'undefined') {
          window.dataLayer.push({
            'event': 'checkout_click',
            'headline_variant': variant
          });
        }
      });
    });
  }

  // Initialize tracking
  function init() {
    // Store UTM parameters
    const utmParams = storeUTMParameters();
    
    // Get A/B test variant
    const variant = getABTestVariant();
    const headlineContent = getHeadlineContent(variant);
    
    // Make data available globally
    window.trackingData = {
      utmParams: utmParams,
      abVariant: variant,
      headlineContent: headlineContent
    };
    
    // Push to dataLayer for GTM
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        'event': 'page_view',
        'utm_source': utmParams.utm_source,
        'utm_medium': utmParams.utm_medium,
        'utm_campaign': utmParams.utm_campaign,
        'utm_term': utmParams.utm_term,
        'utm_content': utmParams.utm_content,
        'headline_variant': variant
      });
    }
    
    // Setup checkout tracking
    setTimeout(addHeadlineToCheckout, 1000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();