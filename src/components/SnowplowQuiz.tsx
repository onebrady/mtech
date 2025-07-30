import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Truck,
  Snowflake,
  DollarSign,
  Settings,
} from "lucide-react";
import type { QuizAnswers } from "../App";

interface SnowplowQuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

interface QuizFormData {
  useCase: string;
  vehicleType: string;
  snowConditions: string;
  budget: string;
  features: string[];
}

const questions = [
  {
    id: "useCase",
    title: "What's your primary use?",
    icon: Truck,
    options: [
      {
        value: "personal",
        label: "Personal Property",
        description: "My driveway and walkways",
      },
      {
        value: "small-business",
        label: "Small Business",
        description: "A few driveways, small lots",
      },
      {
        value: "commercial",
        label: "Commercial Service",
        description: "Multiple properties, parking lots",
      },
      {
        value: "municipal",
        label: "Municipal/Highway",
        description: "Roads, streets, large-scale operations",
      },
    ],
  },
  {
    id: "vehicleType",
    title: "What's your vehicle?",
    icon: Truck,
    options: [
      {
        value: "half-ton",
        label: "Half-Ton Pickup",
        description: "F-150, Silverado 1500, RAM 1500",
      },
      {
        value: "three-quarter",
        label: "Three-Quarter Ton",
        description: "F-250, Silverado 2500, RAM 2500",
      },
      {
        value: "one-ton",
        label: "One-Ton+",
        description: "F-350+, Silverado 3500+, RAM 3500+",
      },
      {
        value: "heavy-commercial",
        label: "Heavy Commercial",
        description: "F-450+, Municipal trucks",
      },
    ],
  },
  {
    id: "snowConditions",
    title: "Your typical snow conditions?",
    icon: Snowflake,
    options: [
      {
        value: "light",
        label: "Light Snow",
        description: "Under 4 inches, powdery",
      },
      {
        value: "moderate",
        label: "Moderate Snow",
        description: "4-8 inches typical",
      },
      {
        value: "heavy",
        label: "Heavy/Wet Snow",
        description: "8+ inches, dense snow",
      },
      {
        value: "all-conditions",
        label: "All Conditions",
        description: "Ice, packed snow, varying depths",
      },
    ],
  },
  {
    id: "budget",
    title: "Your budget range?",
    icon: DollarSign,
    options: [
      {
        value: "under-5k",
        label: "Under $5,000",
        description: "Basic residential",
      },
      {
        value: "5k-10k",
        label: "$5,000-$10,000",
        description: "Mid-range commercial",
      },
      {
        value: "10k-20k",
        label: "$10,000-$20,000",
        description: "Professional grade",
      },
      {
        value: "20k-plus",
        label: "$20,000+",
        description: "Heavy-duty municipal",
      },
    ],
  },
  {
    id: "features",
    title: "Most important features?",
    icon: Settings,
    description: "Select up to 3",
    multiSelect: true,
    options: [
      { value: "easy-attachment", label: "Easy attachment/removal" },
      { value: "corrosion-resistance", label: "Corrosion resistance" },
      { value: "low-maintenance", label: "Low maintenance" },
      { value: "maximum-durability", label: "Maximum durability" },
      { value: "advanced-controls", label: "Advanced controls" },
      { value: "wing-extensions", label: "Wing extensions" },
    ],
  },
];

export default function SnowplowQuiz({ onComplete }: SnowplowQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { control, handleSubmit, watch, setValue } = useForm<QuizFormData>({
    defaultValues: {
      useCase: "",
      vehicleType: "",
      snowConditions: "",
      budget: "",
      features: [],
    },
  });

  const watchedValues = watch();

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: QuizFormData) => {
    onComplete(data);
  };

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const canProceed =
    watchedValues[currentQuestion.id as keyof QuizFormData] &&
    (Array.isArray(watchedValues[currentQuestion.id as keyof QuizFormData])
      ? (watchedValues[currentQuestion.id as keyof QuizFormData] as string[])
          .length > 0
      : watchedValues[currentQuestion.id as keyof QuizFormData] !== "");

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.multiSelect) {
      const currentFeatures = watchedValues.features || [];
      const newFeatures = currentFeatures.includes(value)
        ? currentFeatures.filter((f) => f !== value)
        : currentFeatures.length < 3
        ? [...currentFeatures, value]
        : currentFeatures;
      setValue("features", newFeatures);
    } else {
      setValue(currentQuestion.id as keyof QuizFormData, value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs sm:text-sm font-medium text-mtech-gray">
            Step {currentStep + 1} of {questions.length}
          </span>
          <span className="text-xs sm:text-sm font-medium text-mtech-gray">
            {Math.round(((currentStep + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-mtech-blue h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <currentQuestion.icon className="w-6 h-6 sm:w-8 sm:h-8 text-mtech-blue" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-mtech-darkblue mb-2">
          {currentQuestion.title}
        </h2>
        {currentQuestion.description && (
          <p className="text-mtech-gray text-base sm:text-lg">
            {currentQuestion.description}
          </p>
        )}
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <AnimatePresence mode="wait">
          {currentQuestion.options.map((option, index) => {
            const isSelected = currentQuestion.multiSelect
              ? watchedValues.features?.includes(option.value)
              : watchedValues[currentQuestion.id as keyof QuizFormData] ===
                option.value;

            return (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative cursor-pointer group`}
              >
                <div
                  onClick={() => handleOptionSelect(option.value)}
                  className={`p-4 sm:p-6 rounded-lg border transition-all duration-300 ${
                    isSelected
                      ? "border-mtech-blue bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-mtech-blue hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-mtech-blue bg-mtech-blue"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-base sm:text-lg mb-1 ${
                          isSelected ? "text-mtech-blue" : "text-mtech-darkblue"
                        }`}
                      >
                        {option.label}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm ${
                          isSelected ? "text-mtech-blue" : "text-mtech-gray"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <motion.button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded font-medium transition-all duration-300 ${
            currentStep === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-mtech-gray hover:text-mtech-darkblue hover:bg-gray-100"
          }`}
          whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
          whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {isLastStep ? (
          <motion.button
            onClick={handleSubmit(onSubmit)}
            disabled={!canProceed}
            className={`flex items-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 rounded font-medium transition-all duration-300 ${
              canProceed
                ? "bg-mtech-blue text-white hover:bg-mtech-darkblue hover:shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            whileHover={canProceed ? { scale: 1.05 } : {}}
            whileTap={canProceed ? { scale: 0.95 } : {}}
          >
            <span>Get My Recommendation</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-3 rounded font-medium transition-all duration-300 ${
              canProceed
                ? "bg-mtech-blue text-white hover:bg-mtech-darkblue hover:shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            whileHover={canProceed ? { scale: 1.05 } : {}}
            whileTap={canProceed ? { scale: 0.95 } : {}}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
