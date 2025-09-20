import { Command } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20">
      <div className="container px-4">
        <div className="glass glass-hover rounded-xl p-8">
          <div className="text-center">
            <h3 className="font-medium text-lg mb-4">IA Provedor</h3>
            <p className="text-sm text-muted-foreground mb-8">
              Automatizando o atendimento de provedores de internet com inteligência artificial.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} IA Provedor. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;