import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MessageSquare } from "lucide-react";
import SnowplowQuiz from "./components/SnowplowQuiz";
import RecommendationDisplay from "./components/RecommendationDisplay";
import KnowledgeCenter from "./components/KnowledgeCenter";
import Header from "./components/Header";
import Footer from "./components/Footer";

export interface QuizAnswers {
  useCase: string;
  vehicleType: string;
  snowConditions: string;
  budget: string;
  features: string[];
}

export interface Recommendation {
  name: string;
  description: string;
  price: string;
  features: string[];
  whyPerfect: string[];
  alternatives: Array<{
    name: string;
    price: string;
    why: string;
    bestFor: string;
  }>;
}

function App() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [currentSection, setCurrentSection] = useState<
    "home" | "quiz" | "recommendation" | "knowledge"
  >("home");
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Listen for viewKnowledge and startQuiz events
  React.useEffect(() => {
    const handleViewKnowledge = () => {
      setCurrentSection("knowledge");
    };

    const handleStartQuizEvent = () => {
      setCurrentSection("quiz");
    };

    window.addEventListener("viewKnowledge", handleViewKnowledge);
    window.addEventListener("startQuiz", handleStartQuizEvent);

    return () => {
      window.removeEventListener("viewKnowledge", handleViewKnowledge);
      window.removeEventListener("startQuiz", handleStartQuizEvent);
    };
  }, []);

  // Control visibility of floating quiz button on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Show the floating button when scrolled down more than 300px and on the home or knowledge page
      const shouldShow =
        window.scrollY > 300 &&
        (currentSection === "home" || currentSection === "knowledge") &&
        window.innerWidth < 768; // Only on mobile/tablet

      setShowFloatingButton(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentSection]);

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setShowRecommendation(true);
    setCurrentSection("recommendation");
  };

  const handleBackToQuiz = () => {
    setCurrentSection("quiz");
    setShowRecommendation(false);
  };

  const handleStartQuiz = () => {
    setCurrentSection("quiz");
  };

  const handleViewKnowledge = () => {
    setCurrentSection("knowledge");
  };

  const handleBackToHome = () => {
    setCurrentSection("home");
  };

  return (
    <div className="min-h-screen snow-bg">
      <Header />

      {/* Floating Quiz Button for mobile */}
      {showFloatingButton && (
        <motion.button
          onClick={handleStartQuiz}
          className="floating-quiz-btn w-14 h-14"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      )}

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <AnimatePresence mode="wait">
          {currentSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              ref={heroRef}
            >
              {/* Hero Section with CTA */}
              <div className="text-center mb-12">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-mtech-darkblue mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  MTech Snowplow Selection Guide
                </motion.h1>
                <motion.div
                  className="w-24 h-1 bg-mtech-blue mx-auto mb-6"
                  initial={{ opacity: 0, width: 0 }}
                  animate={heroInView ? { opacity: 1, width: 96 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />

                {/* Knowledge Center Preview */}
                <div className="mb-12">
                  <div className="mb-6 max-w-2xl mx-auto">
                    <p className="text-mtech-gray text-lg">
                      Your complete resource for professional snow equipment
                      information
                    </p>
                  </div>
                  <KnowledgeCenter
                    isPreview={true}
                    onBackToQuiz={handleBackToQuiz}
                    onBackToRecommendation={() =>
                      setCurrentSection("recommendation")
                    }
                  />

                  {/* Smaller Quiz CTA */}
                  <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white shadow-md rounded-lg p-4 border border-gray-200">
                      <div>
                        <h3 className="text-lg font-semibold text-mtech-darkblue mb-1">
                          Need a quick recommendation?
                        </h3>
                        <p className="text-sm text-mtech-gray">
                          Take our 2-minute quiz to find your perfect snowplow
                        </p>
                      </div>
                      <button
                        onClick={handleStartQuiz}
                        className="mtech-btn-secondary whitespace-nowrap"
                      >
                        Take the Quiz
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-mtech-darkblue mb-6">
                  Snowplow Selection Quiz
                </motion.h1>
                <motion.p className="text-lg sm:text-xl md:text-2xl text-mtech-gray mb-8 max-w-3xl mx-auto">
                  Find Your Perfect Snowplow in Under 2 Minutes
                </motion.p>
                <motion.div className="flex justify-center w-full px-4 sm:px-6">
                  <div className="w-full max-w-4xl bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100">
                    <SnowplowQuiz onComplete={handleQuizComplete} />
                  </div>
                </motion.div>
                <button
                  onClick={handleBackToHome}
                  className="mt-8 text-mtech-blue hover:text-mtech-darkblue flex items-center mx-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}

          {currentSection === "recommendation" && quizAnswers && (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <RecommendationDisplay
                answers={quizAnswers}
                onBackToQuiz={handleBackToQuiz}
                onViewKnowledge={handleViewKnowledge}
              />
              <button
                onClick={handleBackToHome}
                className="mt-8 text-mtech-blue hover:text-mtech-darkblue flex items-center mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </motion.div>
          )}

          {currentSection === "knowledge" && (
            <motion.div
              key="knowledge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <KnowledgeCenter
                isPreview={false}
                onBackToQuiz={handleBackToQuiz}
                onBackToRecommendation={() =>
                  setCurrentSection("recommendation")
                }
              />
              <button
                onClick={handleBackToHome}
                className="mt-8 text-mtech-blue hover:text-mtech-darkblue flex items-center mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
