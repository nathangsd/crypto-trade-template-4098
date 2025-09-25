// Optimized UTM Tracking and A/B Testing Script with Performance Focus
(function() {
  'use strict';

  // Performance: Use requestIdleCallback for non-critical operations
  const runWhenIdle = (callback) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback, { timeout: 2000 });
    } else {
      setTimeout(callback, 100);
    }
  };

  // Cache DOM queries
  const domCache = new Map();
  const getElement = (selector) => {
    if (!domCache.has(selector)) {
      domCache.set(selector, document.querySelector(selector));
    }
    return domCache.get(selector);
  };

  // UTM Parameters Tracking (Optimized)
  const utmParams = new URLSearchParams(window.location.search);
  const utmData = {
    utm_source: utmParams.get('utm_source'),
    utm_medium: utmParams.get('utm_medium'),
    utm_campaign: utmParams.get('utm_campaign'),
    utm_term: utmParams.get('utm_term'),
    utm_content: utmParams.get('utm_content')
  };

  // Cookie operations (Optimized for performance)
  const cookieUtils = {
    set: (name, value, days = 90) => {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`;
    },
    
    get: (name) => {
      return document.cookie
        .split(';')
        .find(row => row.trim().startsWith(name + '='))
        ?.split('=')[1] || null;
    }
  };

  // Store UTM parameters efficiently
  const storeUTMParameters = () => {
    const hasUTM = Object.values(utmData).some(Boolean);
    
    if (hasUTM) {
      // Batch cookie operations
      Object.entries(utmData).forEach(([key, value]) => {
        if (value) cookieUtils.set(key, value);
      });
    } else {
      // Load from existing cookies
      Object.keys(utmData).forEach(key => {
        if (!utmData[key]) {
          utmData[key] = cookieUtils.get(key);
        }
      });
    }
    
    return utmData;
  };

  // A/B Testing (Optimized)
  const abTesting = {
    getVariant: () => {
      let variant = cookieUtils.get('ab_headline_variant');
      
      if (!variant) {
        variant = ['a', 'b', 'c'][Math.floor(Math.random() * 3)];
        cookieUtils.set('ab_headline_variant', variant);
      }
      
      return variant;
    },

    getContent: (variant) => {
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
  };

  // Performance-optimized event tracking
  const trackEvent = (eventName, data = {}) => {
    runWhenIdle(() => {
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
          event: eventName,
          timestamp: Date.now(),
          ...data
        });
      }
    });
  };

  // Optimized checkout button tracking
  const setupCheckoutTracking = () => {
    runWhenIdle(() => {
      // Use event delegation for better performance
      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-checkout-button]');
        if (target) {
          trackEvent('checkout_click', {
            headline_variant: window.trackingData?.abVariant || 'a',
            button_text: target.textContent?.trim(),
            utm_source: window.trackingData?.utmParams?.utm_source
          });
        }
      }, { passive: true });
    });
  };

  // Initialize tracking with performance optimization
  const init = () => {
    // Store UTM data
    const storedUTM = storeUTMParameters();
    
    // Get A/B test data
    const variant = abTesting.getVariant();
    const headlineContent = abTesting.getContent(variant);
    
    // Make data globally available (cached)
    window.trackingData = Object.freeze({
      utmParams: storedUTM,
      abVariant: variant,
      headlineContent: headlineContent
    });
    
    // Track initial page view
    trackEvent('page_view', {
      ...storedUTM,
      headline_variant: variant,
      page_load_time: performance.now(),
      connection_type: navigator.connection?.effectiveType || 'unknown'
    });
    
    // Setup event tracking
    setupCheckoutTracking();
  };

  // Performance-optimized initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    runWhenIdle(init);
  }

  // Performance monitoring
  if ('PerformanceObserver' in window) {
    runWhenIdle(() => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            trackEvent('performance_navigation', {
              load_time: entry.loadEventEnd - entry.loadEventStart,
              dom_content_loaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
              dns_time: entry.domainLookupEnd - entry.domainLookupStart
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation', 'paint'] });
    });
  }
})();