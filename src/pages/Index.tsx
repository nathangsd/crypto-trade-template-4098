import { motion } from "framer-motion";
import { ArrowRight, Command, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useTallyPopup } from "@/components/TallyPopup";
import { useABTesting } from "@/hooks/useABTesting";
import { lazy, Suspense } from "react";

// Lazy load non-critical components for better performance
const LazyTestimonials = lazy(() => import("@/components/TestimonialsSection"));
const LazyFooter = lazy(() => import("@/components/Footer"));

const Index = () => {
  const { openTallyPopup } = useTallyPopup();
  const { headlineContent, variant, isLoaded, trackCheckoutClick } = useABTesting();

  const scrollToPricing = () => {
    trackCheckoutClick();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-black text-foreground transform-gpu">
      <Navigation />
      
      {/* Hero Section - Critical above-the-fold content */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        {/* Background - Optimized */}
        <div 
          className="absolute inset-0 -z-10 bg-[#0A0A0A] will-change-transform"
        />
        
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full glass transform-gpu"
          >
            <span className="text-sm font-medium">
              <Command className="w-4 h-4 inline-block mr-2" />
              IA para provedores de internet
            </span>
          </motion.div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4 tracking-tight leading-tight will-change-opacity">
            <span className="text-gray-200">
              <TextGenerateEffect words={headlineContent.headline.split(',')[0] + ","} />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words={headlineContent.headline.split(',')[1]?.trim() || ""} />
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-center"
          >
            {headlineContent.subheadline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="button-gradient transform-gpu"
              onClick={scrollToPricing}
              data-checkout-button
            >
              Quero testar grátis por 3 meses
            </Button>
            <Button size="lg" variant="link" className="text-white">
              Assistir demonstração <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.section>


      {/* Features Section */}
      <div id="features" className="bg-black pt-12">
        <FeaturesSection />
      </div>

      {/* Por que uma IA é indispensável */}
      <section className="container px-4 py-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-normal mb-8"
          >
            Por que uma IA é{" "}
            <span className="text-gradient font-medium">indispensável</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="text-red-400">⚡</span>
              O consumidor de internet é imediatista:
            </h3>
            
            <div className="space-y-4 mb-8 text-lg text-gray-300">
              <p>• Se ele não recebe resposta em minutos, já pede orçamento em outro lugar.</p>
              <p>• O tempo médio para fechar depende diretamente da <strong className="text-white">velocidade de resposta</strong>.</p>
            </div>

            <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="text-green-400">🤖</span>
              Nossa IA garante:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                <Check className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="font-medium mb-2">Resposta imediata, 24/7</h4>
                <p className="text-sm text-gray-400">Nunca mais perca um lead por demora no atendimento</p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                <Check className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="font-medium mb-2">Qualificação automática</h4>
                <p className="text-sm text-gray-400">Bairro, tipo de plano, urgência - tudo coletado automaticamente</p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                <Check className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="font-medium mb-2">Atendimento padronizado</h4>
                <p className="text-sm text-gray-400">Sempre profissional, sempre com as informações corretas</p>
              </div>
            </div>

            <p className="text-xl text-center font-medium">
              <span className="text-gradient">Enquanto você dorme, sua empresa segue vendendo.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impacto no faturamento */}
      <section className="container px-4 py-16 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20"
          >
            <h2 className="text-4xl md:text-5xl font-normal mb-8 text-center">
              Impacto no{" "}
              <span className="text-gradient font-medium">Faturamento</span>
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-xl text-gray-200 mb-6">
                Pesquisas mostram que leads atendidos em <strong className="text-primary">menos de 5 minutos</strong> têm até{" "}
                <strong className="text-primary text-2xl">100x mais chances</strong> de se converter em clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">📈</div>
                <h3 className="font-medium mb-2">Mais contratos fechados</h3>
                <p className="text-sm text-gray-400">Resposta rápida = maior conversão</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">❌</div>
                <h3 className="font-medium mb-2">Menos cancelamentos</h3>
                <p className="text-sm text-gray-400">Cliente bem atendido não desiste</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">💰</div>
                <h3 className="font-medium mb-2">Crescimento sem custo</h3>
                <p className="text-sm text-gray-400">Mais vendas sem contratar pessoas</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg mb-6">
                E o melhor: você pode <strong className="text-primary">testar grátis por 3 meses</strong>, sem risco.
              </p>
              <Button 
                size="lg" 
                className="button-gradient"
                onClick={scrollToPricing}
                data-checkout-button
              >
                Quero testar grátis por 3 meses
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing" className="bg-black pt-8">
        <PricingSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black pt-8">
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className="container px-4 py-16 relative bg-black">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para automatizar seu atendimento?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de provedores que já descobriram o poder da IA no atendimento.
          </p>
          <Button 
            size="lg" 
            className="button-gradient"
            onClick={scrollToPricing}
            data-checkout-button
          >
            Quero começar agora
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
