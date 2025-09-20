import { motion } from "framer-motion";

interface FeatureContentProps {
  title: string;
}

export const FeatureContent = ({ title }: FeatureContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex items-center justify-center"
    >
      <div className="glass rounded-xl p-8 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
        <div className="text-center relative z-10">
          <h3 className="text-xl font-medium text-white mb-4">{title}</h3>
          <p className="text-gray-400">
            Funcionalidade configurada e pronta para uso
          </p>
        </div>
      </div>
    </motion.div>
  );
};