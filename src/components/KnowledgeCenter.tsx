import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowLeft,
  BookOpen,
  Truck,
  Shield,
  Wrench,
  DollarSign,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface KnowledgeCenterProps {
  onBackToQuiz: () => void;
  onBackToRecommendation: () => void;
  isPreview?: boolean;
}

const knowledgeSections = [
  {
    id: "types",
    title: "Snowplow Types",
    icon: Truck,
    content: {
      sections: [
        {
          title: "Front-Mounted Plows: The Workhorse",
          description: "Push snow off roads with angled blades",
          perfectFor: "All applications from residential to municipal",
          advantages: [
            "Superior operator visibility and control",
            "Quick attachment with modern mounting systems",
            "Wide range of blade options available",
            "Higher ground clearance for rough terrain",
          ],
          applications: {
            residential: [
              "Driveways and walkways",
              "Personal property maintenance",
              "Light-duty occasional use",
            ],
            commercial: [
              "Parking lots and business access",
              "Multi-property snow removal",
              "Professional contractor operations",
            ],
          },
        },
        {
          title: "Wing Plows: Efficiency Multiplier",
          description: "Extend clearing width by mounting on truck sides",
          perfectFor: "Large areas where efficiency matters most",
          advantages: [
            "40% More Productive - Clear wider areas in fewer passes",
            "Lower Operating Costs - Reduce fuel and labor expenses",
            "Ideal for Highways - Perfect for interstate and arterial clearing",
          ],
          applications: [
            "Highway and interstate maintenance",
            "Large commercial facilities",
            "Municipal operations prioritizing efficiency",
            "Areas with wide-open spaces",
          ],
        },
        {
          title: "Underbody Scrapers: The Ice Eliminator",
          description: "Mount under truck to scrape packed ice and snow",
          perfectFor: "Complete road clearing to bare pavement",
          advantages: [
            "Remove Dangerous Ice - Eliminate hazardous surface conditions",
            "Prepare for De-icing - Create proper surface for salt/brine application",
            "Professional Standard - Meet municipal bare-pavement requirements",
          ],
          applications: [
            "Municipal street maintenance",
            "Commercial areas requiring bare pavement",
            "Locations with frequent freeze-thaw cycles",
            "Professional operations with strict standards",
          ],
        },
      ],
    },
  },
  {
    id: "materials",
    title: "Blade Materials",
    icon: Settings,
    content: {
      comparison: [
        {
          material: "Steel",
          initialCost: "$",
          durability: "⭐⭐⭐",
          snowRelease: "⭐⭐",
          corrosionResistance: "⭐",
          bestFor: "Budget-conscious, occasional use",
        },
        {
          material: "Polyethylene",
          initialCost: "$$",
          durability: "⭐⭐⭐⭐",
          snowRelease: "⭐⭐⭐⭐⭐",
          corrosionResistance: "⭐⭐⭐⭐⭐",
          bestFor: "Commercial, high-use operations",
        },
        {
          material: "Stainless Steel",
          initialCost: "$$$",
          durability: "⭐⭐⭐⭐",
          snowRelease: "⭐⭐⭐",
          corrosionResistance: "⭐⭐⭐⭐⭐",
          bestFor: "Premium applications",
        },
        {
          material: "Tungsten Carbide",
          initialCost: "$$$$",
          durability: "⭐⭐⭐⭐⭐",
          snowRelease: "⭐⭐⭐",
          corrosionResistance: "⭐⭐⭐⭐",
          bestFor: "Heavy-duty, maximum longevity",
        },
      ],
      details: [
        {
          title: "Steel Blades: The Traditional Choice",
          priceRange: "$200-$600 per blade",
          lifespan: "1-2 seasons with regular use",
          maintenance: "Requires rust prevention treatment",
          chooseIf: [
            "Budget is your primary concern",
            "Infrequent use (residential/occasional)",
            "Easy access to replacement parts important",
            "Working in non-corrosive environments",
          ],
        },
        {
          title: "Polyethylene Blades: Modern Performance",
          priceRange: "$400-$900 per blade",
          lifespan: "3-5 seasons with regular use",
          fuelSavings: "Reduced drag improves fuel economy",
          chooseIf: [
            "Daily commercial operation",
            "Working with salt/brine applications",
            "Fuel efficiency is important",
            "Want quieter operation",
            "Seeking lower total cost of ownership",
          ],
        },
      ],
    },
  },
  {
    id: "sizing",
    title: "Size & Vehicle Matching",
    icon: Truck,
    content: {
      vehicles: [
        {
          type: "Half-Ton Trucks (F-150, Silverado 1500, RAM 1500)",
          category: "Residential & Light Commercial Specialist",
          specs: {
            bladeWidth: "7.5-8 feet maximum",
            weightLimit: "600-700 pounds total system",
            configurations: "Straight blades, light V-plows",
            ballast: "400-500 pounds rear-mounted",
          },
          priceRange: "$3,500-$6,500 installed",
          applications: [
            "Personal driveways and walkways",
            "Small business parking areas",
            "Light contractor work",
            "Occasional use operations",
          ],
          limitations: [
            "Not suitable for continuous commercial use",
            "Limited to lighter snow conditions",
            "Requires careful weight management",
          ],
        },
        {
          type: "Three-Quarter & One-Ton Trucks (F-250/350, Silverado 2500/3500)",
          category: "Commercial Workhorse Category",
          specs: {
            bladeWidth: "8-10 feet optimal range",
            weightCapacity: "800-1,200 pounds",
            configurations: "Straight, V-plow, expandable options",
            features: "Advanced hydraulics available",
          },
          priceRange: "$6,000-$15,000 installed",
          applications: [
            "Commercial snow removal services",
            "Municipal light-duty operations",
            "Multi-property contractor work",
            "Professional daily operations",
          ],
          advantages: [
            "Handle all snow conditions effectively",
            "Support professional-grade features",
            "Suitable for daily commercial use",
            "Excellent versatility and capability",
          ],
        },
      ],
    },
  },
  {
    id: "costs",
    title: "Cost & ROI Analysis",
    icon: DollarSign,
    content: {
      investment: {
        residential: "$3,500-$6,500",
        lightCommercial: "$6,000-$12,000",
        heavyCommercial: "$12,000-$20,000",
        municipal: "$20,000-$35,000+",
      },
      operatingCosts: [
        {
          type: "Residential",
          equipment: "$500-$1,000",
          maintenance: "$300-$800",
          fuel: "$200-$600",
          insurance: "$500-$1,200",
          total: "$1,500-$3,600",
        },
        {
          type: "Light Commercial",
          equipment: "$1,500-$3,000",
          maintenance: "$800-$2,000",
          fuel: "$800-$2,500",
          insurance: "$2,000-$5,000",
          total: "$5,100-$12,500",
        },
      ],
      revenue: {
        residential: {
          perVisit: "$30-$70 per driveway",
          seasonal: "$200-$600 per customer",
          customers: "50-200 customers typical",
          annual: "$10,000-$120,000",
        },
        commercial: {
          hourly: "$80-$200 per hour",
          lotContracts: "$300-$1,500 per visit",
          seasonal: "$2,000-$15,000 per property",
          annual: "$75,000-$300,000+",
        },
      },
    },
  },
  {
    id: "safety",
    title: "Safety & Training",
    icon: Shield,
    content: {
      features: {
        operator: [
          "ROPS/FOPS - Roll-over and falling object protection",
          "Visibility Enhancement - LED light packages, strobes",
          "Emergency Controls - Quick shutdown capabilities",
          "Ergonomic Design - Reduced operator fatigue",
        ],
        public: [
          "High-Visibility Lighting - Strobe and beacon systems",
          "Reflective Markings - Enhanced low-light visibility",
          "Audible Warnings - Backup alarms and operational signals",
          "Proper Signage - Clear hazard identification",
        ],
      },
      training: [
        {
          title: "Equipment Familiarization (2-3 hours)",
          topics: [
            "Control system operation and safety features",
            "Pre-operation inspection procedures",
            "Basic troubleshooting and maintenance",
            "Emergency shutdown procedures",
          ],
        },
        {
          title: "Safe Operating Procedures (3-4 hours)",
          topics: [
            "Proper techniques for various snow conditions",
            "Hazard recognition and avoidance",
            "Defensive driving specific to snowplow operations",
            "Equipment limits and capabilities",
          ],
        },
      ],
    },
  },
  {
    id: "maintenance",
    title: "Maintenance Guide",
    icon: Wrench,
    content: {
      preSeason: [
        "Hydraulic system pressure test and leak check",
        "All electrical connections and lighting systems",
        "Cutting edge wear assessment and replacement",
        "Trip spring tension and operation verification",
        "All pivot points lubrication and adjustment",
        "Control system function testing",
      ],
      daily: [
        "Visual inspection for damage or wear",
        "Hydraulic fluid level check",
        "Cutting edge condition assessment",
        "All lights and warning systems test",
        "Control system operation verification",
      ],
      weekly: [
        "Thorough equipment cleaning (remove salt/debris)",
        "Detailed cutting edge wear measurement",
        "Hydraulic hose inspection for leaks/damage",
        "Lubrication of all grease points",
        "Trip mechanism operation test",
      ],
      replacement: [
        {
          component: "Cutting Edges",
          frequency: "1-3 seasons",
          cost: "$100-$800",
        },
        {
          component: "Trip Springs",
          frequency: "3-5 seasons",
          cost: "$75-$150 each",
        },
        {
          component: "Hydraulic Hoses",
          frequency: "5-7 seasons",
          cost: "$50-$200 each",
        },
      ],
    },
  },
];

export default function KnowledgeCenter({
  onBackToQuiz,
  onBackToRecommendation,
  isPreview = false,
}: KnowledgeCenterProps) {
  const [activeSection, setActiveSection] = useState<string | null>(
    isPreview ? "types" : null
  );
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(isPreview ? ["types"] : [])
  );

  // For the "View All Knowledge" button in preview mode
  const handleViewKnowledge = () => {
    window.scrollTo(0, 0);
    const viewKnowledgeEvent = new CustomEvent("viewKnowledge");
    window.dispatchEvent(viewKnowledgeEvent);
  };

  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto" ref={containerRef}>
      {/* Header - Only show in full view */}
      {!isPreview && (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={containerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BookOpen className="w-4 h-4" />
            <span>Complete Snowplow Knowledge Center</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={containerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Everything You Need to Know
          </motion.h1>
          <motion.p
            className="text-xl text-snow-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={containerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Comprehensive guide to snowplow selection, operation, and
            maintenance
          </motion.p>

          {/* Concise Quiz CTA */}
          <motion.div
            className="max-w-2xl mx-auto my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={containerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-mtech-blue to-mtech-darkblue rounded-lg overflow-hidden shadow-md">
              <div className="flex items-center">
                <div className="p-4 md:p-5 flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Find Your Perfect Snowplow in 2 Minutes
                  </h3>
                </div>
                <button
                  onClick={() => {
                    const startQuizEvent = new CustomEvent("startQuiz");
                    window.dispatchEvent(startQuizEvent);
                  }}
                  className="bg-white text-mtech-darkblue hover:bg-gray-100 font-medium py-3 px-5 m-2 rounded transition-colors duration-300 whitespace-nowrap"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Quick Navigation - Only show in full view */}
      {!isPreview && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {knowledgeSections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? "border-primary-500 bg-primary-50 shadow-lg"
                  : "border-snow-200 bg-white hover:border-primary-300 hover:shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={containerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className="flex flex-col items-center space-y-2">
                <section.icon className="w-6 h-6 text-primary-600" />
                <span className="text-sm font-medium text-snow-700">
                  {section.title}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Content Sections */}
      <div className="space-y-8">
        {knowledgeSections
          .filter((section) => !isPreview || section.id === "types") // Only show "types" section in preview mode
          .map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              id={section.id}
              className="bg-white rounded-2xl shadow-lg border border-snow-200 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={containerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + sectionIndex * 0.1 }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-snow-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <section.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-snow-800">
                    {section.title}
                  </h2>
                </div>
                {expandedSections.has(section.id) ? (
                  <ChevronUp className="w-6 h-6 text-snow-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-snow-600" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.has(section.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-snow-200"
                  >
                    <div className="p-6">
                      {section.id === "types" && section.content?.sections && (
                        <div className="space-y-8">
                          {section.content.sections.map((type, index) => (
                            <div
                              key={index}
                              className="border-b border-snow-200 pb-6 last:border-b-0"
                            >
                              <h3 className="text-xl font-bold text-snow-800 mb-2">
                                {type.title}
                              </h3>
                              <p className="text-snow-600 mb-4">
                                {type.description}
                              </p>
                              <div className="bg-primary-50 p-4 rounded-lg mb-4">
                                <p className="font-semibold text-primary-700">
                                  Perfect For: {type.perfectFor}
                                </p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold text-snow-800 mb-2">
                                    Advantages:
                                  </h4>
                                  <ul className="space-y-2">
                                    {type.advantages.map((advantage, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start space-x-2"
                                      >
                                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-snow-700">
                                          {advantage}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-snow-800 mb-2">
                                    Applications:
                                  </h4>
                                  <ul className="space-y-2">
                                    {Array.isArray(type.applications)
                                      ? // Handle array of applications
                                        type.applications.map((app, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-start space-x-2"
                                          >
                                            <div className="w-2 h-2 bg-ice-500 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-snow-700">
                                              {app}
                                            </span>
                                          </li>
                                        ))
                                      : // Handle object with residential/commercial properties
                                        Object.entries(type.applications).map(
                                          ([category, apps], idx) => (
                                            <li key={idx} className="mb-3">
                                              <h5 className="font-medium text-primary-700 capitalize mb-1">
                                                {category}:
                                              </h5>
                                              <ul className="space-y-1 pl-3">
                                                {(apps as string[]).map(
                                                  (app, appIdx) => (
                                                    <li
                                                      key={appIdx}
                                                      className="flex items-start space-x-2"
                                                    >
                                                      <div className="w-2 h-2 bg-ice-500 rounded-full mt-2 flex-shrink-0" />
                                                      <span className="text-snow-700">
                                                        {app}
                                                      </span>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </li>
                                          )
                                        )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === "materials" && section.content?.comparison && (
                        <div className="space-y-6">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-snow-50">
                                  <th className="p-3 text-left border border-snow-200">
                                    Material
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Initial Cost
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Durability
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Snow Release
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Corrosion Resistance
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Best For
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {section.content.comparison.map(
                                  (material, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-snow-50"
                                    >
                                      <td className="p-3 border border-snow-200 font-semibold">
                                        {material.material}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {material.initialCost}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {material.durability}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {material.snowRelease}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {material.corrosionResistance}
                                      </td>
                                      <td className="p-3 border border-snow-200 text-sm">
                                        {material.bestFor}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {section.id === "costs" && section.content?.investment && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(section.content.investment as Record<string, string>).map(
                              ([type, cost]) => (
                                <div
                                  key={type}
                                  className="bg-snow-50 p-4 rounded-lg"
                                >
                                  <h4 className="font-semibold text-snow-800 capitalize">
                                    {type}
                                  </h4>
                                  <p className="text-2xl font-bold text-primary-600">
                                    {cost}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-snow-50">
                                  <th className="p-3 text-left border border-snow-200">
                                    Operation Type
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Equipment
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Maintenance
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Fuel
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Insurance
                                  </th>
                                  <th className="p-3 text-left border border-snow-200">
                                    Total Annual
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {section.content?.operatingCosts?.map(
                                  (cost, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-snow-50"
                                    >
                                      <td className="p-3 border border-snow-200 font-semibold">
                                        {cost.type}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {cost.equipment}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {cost.maintenance}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {cost.fuel}
                                      </td>
                                      <td className="p-3 border border-snow-200">
                                        {cost.insurance}
                                      </td>
                                      <td className="p-3 border border-snow-200 font-bold text-primary-600">
                                        {cost.total}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {section.id === "safety" && section.content?.features?.operator && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-snow-800 mb-3">
                                Operator Protection Systems:
                              </h4>
                              <ul className="space-y-2">
                                {section.content.features.operator.map((feature, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start space-x-2"
                                  >
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-snow-700">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {section.content?.features?.public && (
                              <div>
                                <h4 className="font-semibold text-snow-800 mb-3">
                                  Public Safety Features:
                                </h4>
                                <ul className="space-y-2">
                                  {section.content.features.public.map((feature, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start space-x-2"
                                    >
                                      <div className="w-2 h-2 bg-ice-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-snow-700">
                                        {feature}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {section.id === "maintenance" && section.content?.preSeason && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Pre-Season Checklist */}
                            <div>
                              <h4 className="font-semibold text-snow-800 mb-3">
                                Pre-Season Checklist:
                              </h4>
                              <ul className="space-y-2">
                                {section.content.preSeason.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start space-x-2"
                                  >
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-snow-700">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Daily Operations */}
                            {section.content?.daily && (
                              <div>
                                <h4 className="font-semibold text-snow-800 mb-3">
                                  Daily Operations:
                                </h4>
                                <ul className="space-y-2">
                                  {section.content.daily.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start space-x-2"
                                    >
                                      <div className="w-2 h-2 bg-ice-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-snow-700">
                                        {item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Weekly Maintenance */}
                            {section.content?.weekly && (
                              <div>
                                <h4 className="font-semibold text-snow-800 mb-3">
                                  Weekly Maintenance:
                                </h4>
                                <ul className="space-y-2">
                                  {section.content.weekly.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start space-x-2"
                                    >
                                      <div className="w-2 h-2 bg-snow-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-snow-700">
                                        {item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
      </div>

      {/* View All Knowledge Button - Only show in preview mode */}
      {isPreview && (
        <div className="mt-10 text-center">
          <motion.button
            onClick={handleViewKnowledge}
            className="mtech-btn inline-flex items-center text-lg px-8 py-3 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={containerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View All Snowplow Knowledge
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
              className="ml-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      )}

      {/* Navigation - Only show in full mode */}
      {!isPreview && (
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mt-12 space-y-4 sm:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
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
            onClick={onBackToRecommendation}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-ice-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to Recommendation</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
