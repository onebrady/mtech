import { motion } from "framer-motion";
import {
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Wrench,
  Star,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mtech-darkblue text-white mt-16 sm:mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-start mb-4">
              <img
                src="https://www.mtechcompany.com/wp-content/uploads/2024/03/mtech-cleveland.png.webp"
                alt="MTech Company Logo"
                className="h-12 w-auto mb-2 invert"
              />
              <p className="text-gray-300 text-sm">
                Snow Equipment Specialists
              </p>
            </div>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Your trusted partner for professional snow removal equipment and
              support across the Midwest.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="bg-primary-600 p-2 rounded-lg hover:bg-primary-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <motion.a
                href="tel:+1234567890"
                className="flex items-center space-x-3 text-snow-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="w-5 h-5 text-primary-400" />
                <span>(123) 456-7890</span>
              </motion.a>
              <motion.a
                href="mailto:info@mtech.com"
                className="flex items-center space-x-3 text-snow-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="w-5 h-5 text-primary-400" />
                <span>info@mtech.com</span>
              </motion.a>
              <motion.div className="flex items-center space-x-3 text-snow-300">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>
                  Ohio, Michigan, Indiana, Kentucky, Western Pennsylvania
                </span>
              </motion.div>
              <motion.div className="flex items-center space-x-3 text-snow-300">
                <Clock className="w-5 h-5 text-primary-400" />
                <span>24/7 Service Support</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <div className="space-y-3">
              <motion.div className="flex items-center space-x-3 text-snow-300">
                <Truck className="w-5 h-5 text-primary-400" />
                <span>Snowplow Sales & Installation</span>
              </motion.div>
              <motion.div className="flex items-center space-x-3 text-snow-300">
                <Wrench className="w-5 h-5 text-primary-400" />
                <span>Maintenance & Repairs</span>
              </motion.div>
              <motion.div className="flex items-center space-x-3 text-snow-300">
                <Shield className="w-5 h-5 text-primary-400" />
                <span>Operator Training</span>
              </motion.div>
              <motion.div className="flex items-center space-x-3 text-snow-300">
                <Star className="w-5 h-5 text-primary-400" />
                <span>Custom Solutions</span>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">
              Ready to Get Started?
            </h4>
            <div className="space-y-3">
              <motion.button
                className="w-full bg-gradient-to-r from-primary-500 to-ice-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Demo
              </motion.button>
              <motion.button
                className="w-full bg-white/10 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Quote
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-snow-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-snow-400 text-sm">
            © 2024 MTech. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              className="text-snow-400 hover:text-white transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-snow-400 hover:text-white transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-snow-400 hover:text-white transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Support
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
