"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono da ProvedorNet",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "Antes da IA, perdíamos muitos contatos à noite. Agora os clientes recebem resposta imediata, e quando chego no dia seguinte já tenho leads prontos para fechar."
  },
  {
    name: "Fernanda Costa",
    role: "Gestora de vendas ConectaMais",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "Minha equipe ficou mais leve. A IA resolve 70% das dúvidas iniciais e a gente só entra quando o cliente já está quase fechado."
  },
  {
    name: "Roberto Mendes",
    role: "Diretor comercial FiberMax",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "O atendimento 24h foi um divisor de águas. Nossos concorrentes perdem leads de madrugada, enquanto a nossa IA está sempre respondendo."
  },
  {
    name: "Ana Paula",
    role: "Proprietária NetSpeed",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "Em 3 meses usando a IA, aumentamos nossa conversão em 40%. O cliente já chega qualificado para o vendedor humano."
  },
  {
    name: "Marcus Oliveira",
    role: "Gerente de atendimento TurboNet",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "Antes gastávamos muito com atendentes extras. Agora a IA faz o trabalho inicial e nossa equipe foca apenas nos fechamentos."
  },
  {
    name: "Juliana Santos",
    role: "Sócia da ConexãoRápida",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "A resposta automática no WhatsApp mudou tudo. Os clientes se sentem bem atendidos mesmo fora do horário comercial."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Confiado por Provedores</h2>
          <p className="text-muted-foreground text-lg">
            Junte-se a centenas de provedores satisfeitos com nossa IA
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;