import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowLeft,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Truck,
  DollarSign,
  Settings,
} from "lucide-react";
import type { QuizAnswers, Recommendation } from "../App";

interface RecommendationDisplayProps {
  answers: QuizAnswers;
  onBackToQuiz: () => void;
  onViewKnowledge: () => void;
}

// Recommendation logic based on quiz answers
const getRecommendation = (answers: QuizAnswers): Recommendation => {
  const { useCase, vehicleType, snowConditions } = answers;

  // Commercial + Heavy Duty + Heavy Snow
  if (
    useCase === "commercial" &&
    vehicleType === "one-ton" &&
    snowConditions === "heavy"
  ) {
    return {
      name: "BOSS V-DXT Series V-Plow",
      description:
        "Professional V-plow system perfect for heavy commercial operations",
      price: "$13,000-$16,000",
      features: [
        "9ft Polyethylene V-Plow",
        "Touch Screen Control System",
        "Professional Quick-Attach",
        "Advanced Hydraulic Controls",
      ],
      whyPerfect: [
        "V-Plow Design cuts through heavy, wet snow efficiently",
        "Polyethylene Blade reduces drag and fuel costs",
        "Professional Controls for daily commercial use",
        "Built for heavy-duty operations",
      ],
      alternatives: [
        {
          name: "Western MVP Plus V-Plow",
          price: "$11,000-$14,000",
          why: "Advanced trip-edge protection",
          bestFor: "Areas with hidden obstacles",
        },
        {
          name: "Fisher HD2 V-Plow",
          price: "$12,000-$15,000",
          why: "Proven durability and performance",
          bestFor: "Professional contractors",
        },
      ],
    };
  }

  // Municipal + Heavy Commercial + All Conditions
  if (
    useCase === "municipal" &&
    vehicleType === "heavy-commercial" &&
    snowConditions === "all-conditions"
  ) {
    return {
      name: "Western MVP Plus Municipal System",
      description: "Heavy-duty municipal plow for all weather conditions",
      price: "$18,000-$25,000",
      features: [
        "10ft Polyethylene V-Plow",
        "Municipal Control System",
        "Heavy-Duty Mounting",
        "Advanced Safety Features",
      ],
      whyPerfect: [
        "Municipal-grade construction for daily use",
        "Advanced safety features for public roads",
        "Handles all snow and ice conditions",
        "Built for continuous operation",
      ],
      alternatives: [
        {
          name: "BOSS Municipal V-DXT",
          price: "$20,000-$28,000",
          why: "Extensive municipal experience",
          bestFor: "Large municipal fleets",
        },
        {
          name: "Fisher Municipal Series",
          price: "$16,000-$22,000",
          why: "Cost-effective municipal solution",
          bestFor: "Budget-conscious municipalities",
        },
      ],
    };
  }

  // Personal + Half-Ton + Light Snow
  if (
    useCase === "personal" &&
    vehicleType === "half-ton" &&
    snowConditions === "light"
  ) {
    return {
      name: "BOSS Straight Blade Residential",
      description: "Perfect residential plow for personal use",
      price: "$3,500-$6,500",
      features: [
        "7.5ft Steel Blade",
        "Standard Hydraulic Controls",
        "Easy Mounting System",
        "Residential Durability",
      ],
      whyPerfect: [
        "Perfect size for half-ton trucks",
        "Affordable for personal use",
        "Easy to install and operate",
        "Reliable for occasional use",
      ],
      alternatives: [
        {
          name: "Fisher Residential Series",
          price: "$4,000-$7,000",
          why: "Enhanced residential features",
          bestFor: "Premium residential use",
        },
        {
          name: "Western Residential Blade",
          price: "$3,000-$5,500",
          why: "Budget-friendly option",
          bestFor: "Basic residential needs",
        },
      ],
    };
  }

  // Small Business + Three-Quarter Ton + Moderate Snow
  if (
    useCase === "small-business" &&
    vehicleType === "three-quarter" &&
    snowConditions === "moderate"
  ) {
    return {
      name: "BOSS Straight Blade Commercial",
      description: "Professional plow for small business operations",
      price: "$7,000-$12,000",
      features: [
        "8ft Polyethylene Blade",
        "Commercial Control System",
        "Quick-Attach Mounting",
        "Corrosion-Resistant Construction",
      ],
      whyPerfect: [
        "Perfect balance of performance and cost",
        "Commercial-grade durability",
        "Handles moderate snow conditions",
        "Ideal for small business operations",
      ],
      alternatives: [
        {
          name: "Fisher HD2 Straight Blade",
          price: "$8,000-$13,000",
          why: "Advanced commercial features",
          bestFor: "Growing businesses",
        },
        {
          name: "Western Commercial Series",
          price: "$6,500-$11,000",
          why: "Proven commercial reliability",
          bestFor: "Established contractors",
        },
      ],
    };
  }

  // Default recommendation for other combinations
  return {
    name: "BOSS Straight Blade Professional",
    description: "Versatile plow system for your specific requirements",
    price: "$8,000-$12,000",
    features: [
      "8ft Polyethylene Blade",
      "Professional Control System",
      "Quick-Attach Mounting",
      "Corrosion-Resistant Construction",
    ],
    whyPerfect: [
      "Balanced performance for your application",
      "Reliable construction for daily use",
      "Cost-effective solution within your budget",
      "Easy maintenance and operation",
    ],
    alternatives: [
      {
        name: "Fisher HD2 Series",
        price: "$9,000-$13,000",
        why: "Advanced features and durability",
        bestFor: "Professional operations",
      },
      {
        name: "Western Professional Series",
        price: "$7,500-$11,500",
        why: "Proven reliability and support",
        bestFor: "Standard applications",
      },
    ],
  };
};

export default function RecommendationDisplay({
  answers,
  onBackToQuiz,
  onViewKnowledge,
}: RecommendationDisplayProps) {
  const recommendation = getRecommendation(answers);

  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto" ref={containerRef}>
      {/* Header */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <motion.div
          className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={containerInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Star className="w-4 h-4" />
          <span>Your Personalized Recommendation</span>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          variants={itemVariants}
        >
          {recommendation.name}
        </motion.h1>
        <motion.p
          className="text-xl text-snow-600 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {recommendation.description}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={containerInView ? "visible" : "hidden"}
      >
        {/* Main Recommendation */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-xl border border-snow-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-ice-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{recommendation.name}</h2>
              <p className="text-primary-100">
                Perfect for your specific needs
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-snow-800">
                    {recommendation.price}
                  </h3>
                  <p className="text-snow-600">Price Range</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-xl">
                  <Truck className="w-8 h-8 text-primary-600" />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-snow-800 text-lg">
                  Key Features:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recommendation.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-snow-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={containerInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-snow-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-snow-800 text-lg">
                  Why This is Perfect For You:
                </h4>
                <div className="space-y-3">
                  {recommendation.whyPerfect.map((reason, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={containerInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-snow-700">{reason}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div className="space-y-6" variants={itemVariants}>
          {/* Call to Action */}
          <div className="bg-gradient-to-br from-primary-500 to-ice-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
            <div className="space-y-3">
              <motion.button
                className="w-full bg-white text-primary-600 py-3 px-4 rounded-lg font-semibold hover:bg-snow-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Schedule Demo</span>
                </div>
              </motion.button>
              <motion.button
                className="w-full bg-white/20 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Get Custom Quote</span>
                </div>
              </motion.button>
              <motion.button
                className="w-full bg-white/20 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Contact Expert</span>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="bg-white rounded-2xl shadow-lg border border-snow-200 p-6">
            <h3 className="text-lg font-semibold text-snow-800 mb-4">
              Alternative Options
            </h3>
            <div className="space-y-4">
              {recommendation.alternatives.map((alt, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-snow-200 rounded-lg hover:border-primary-300 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={containerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4 className="font-semibold text-snow-800 mb-1">
                    {alt.name}
                  </h4>
                  <p className="text-primary-600 font-medium mb-2">
                    {alt.price}
                  </p>
                  <p className="text-sm text-snow-600 mb-2">{alt.why}</p>
                  <p className="text-xs text-snow-500">
                    Best for: {alt.bestFor}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mt-12 space-y-4 sm:space-y-0"
        variants={itemVariants}
      >
        <motion.button
          onClick={onBackToQuiz}
          className="flex items-center space-x-2 px-6 py-3 text-snow-600 hover:text-snow-800 hover:bg-snow-100 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quiz</span>
        </motion.button>

        <motion.button
          onClick={onViewKnowledge}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-ice-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Learn More</span>
          <Settings className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
