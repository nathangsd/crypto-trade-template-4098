import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureTab } from "./FeatureTab";
import { FeatureContent } from "./FeatureContent";
import { features } from "@/config/features";

export const FeaturesSection = () => {
  const problemFeatures = features.slice(0, 3); // Red icons (problems)
  const solutionFeatures = features.slice(3, 6); // Green icons (solutions)

  return (
    <section className="container px-4 py-16">
      {/* Header Section */}
      <div className="max-w-2xl mb-16 text-center mx-auto">
        <h2 className="text-5xl md:text-6xl font-normal mb-6 tracking-tight">
          Problemas vs
          <br />
          <span className="text-gradient font-medium">Soluções</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400">
          Descubra como nossa IA resolve os principais desafios do atendimento em provedores de internet.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Problems Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-center text-red-400">❌ Problemas Atuais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problemFeatures.map((feature) => (
              <div key={feature.title} className="glass rounded-xl p-6 border border-red-400/20">
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-3 text-base leading-tight">{feature.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-green-400">✅ Nossas Soluções</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutionFeatures.map((feature) => (
              <div key={feature.title} className="glass rounded-xl p-6 border border-green-400/20">
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-3 text-base leading-tight">{feature.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};