import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { useTallyPopup } from "../TallyPopup";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
  onButtonClick,
}: {
  name: string;
  price: string;
  description: string | React.ReactNode;
  features: string[];
  isPopular?: boolean;
  onButtonClick?: () => void;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Custom" && price !== "Gratuito" && <span className="text-gray-400">/month</span>}
      </div>
      <div className="text-gray-400 mb-6">{description}</div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className="button-gradient w-full"
        onClick={onButtonClick}
      >
        Quero começar agora
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  const { openTallyPopup } = useTallyPopup();
  return (
    <section className="container px-4 py-16">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Comece{" "}
          <span className="text-gradient font-medium">Gratuitamente</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Teste nossa IA por 3 meses sem compromisso
        </motion.p>
      </div>

      <div className="flex justify-center max-w-6xl mx-auto">
        <PricingTier
          name="Plano Gratuito"
          price="Gratuito"
          description={
            <>
              Estamos abrindo <span className="bg-primary/20 text-primary px-2 py-1 rounded font-bold">apenas 20 vagas</span> para os primeiros <strong>Membros Fundadores da Flly IA</strong>, que terão acesso exclusivo e vitalício a benefícios especiais:
            </>
          }
          features={[
            "📅 R$ 500 em créditos gratuitos para utilizar na criação de agentes SDR com IA",
            "📅 Assinatura vitalícia gratuita – nunca pagarão mensalidade",
            "📅 Acesso antecipado a funcionalidades novas antes de todos",
            "📅 Canal direto com os fundadores da Flly para sugestões, dúvidas e suporte técnico",
            "📅 Sessões semanais de feedback ao vivo com o time da Flly",
            "📅 Reconhecimento como fundador (badge/perfil dentro da plataforma + citação em materiais)"
          ]}
          isPopular={true}
          onButtonClick={() => {
            // Track checkout click
            if (typeof window !== 'undefined' && window.dataLayer) {
              const variant = document.cookie
                .split('; ')
                .find(row => row.startsWith('ab_headline_variant='))
                ?.split('=')[1] || 'a';
              
              window.dataLayer.push({
                'event': 'checkout_click',
                'headline_variant': variant
              });
            }

            // Load Tally script if not already loaded
            if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
              const script = document.createElement('script');
              script.src = 'https://tally.so/widgets/embed.js';
              script.async = true;
              document.head.appendChild(script);
            }
            
            // Create and trigger the button with Tally attributes
            const tallyButton = document.createElement('button');
            tallyButton.setAttribute('data-tally-open', '3jKzax');
            tallyButton.setAttribute('data-tally-emoji-text', '👋');
            tallyButton.setAttribute('data-tally-emoji-animation', 'wave');
            tallyButton.style.display = 'none';
            document.body.appendChild(tallyButton);
            tallyButton.click();
            document.body.removeChild(tallyButton);
          }}
        />
      </div>
    </section>
  );
};