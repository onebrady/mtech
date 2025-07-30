import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="https://www.mtechcompany.com/wp-content/uploads/2024/03/mtech-cleveland.png.webp"
              alt="MTech Company Logo"
              className="h-12 sm:h-14 w-auto"
            />
          </motion.a>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.a
              href="tel:+18003620240"
              className="flex items-center space-x-2 text-mtech-gray hover:text-mtech-blue transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">1-800-362-0240</span>
            </motion.a>
            <motion.button
              onClick={() => {
                // Dispatch a custom event to start the quiz
                const startQuizEvent = new CustomEvent("startQuiz");
                window.dispatchEvent(startQuizEvent);
              }}
              className="mtech-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Find Your Perfect Snowplow
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-mtech-darkblue rounded"></div>
              <div className="w-full h-0.5 bg-mtech-darkblue rounded"></div>
              <div className="w-full h-0.5 bg-mtech-darkblue rounded"></div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
