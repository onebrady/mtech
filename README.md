# Snowplow Selection Guide

A beautiful, interactive web application that helps users find their perfect snowplow through an intelligent quiz system and comprehensive knowledge center.

## 🚀 Features

### Interactive Quiz System
- **5-Step Progressive Form** - Guided questions about use case, vehicle type, snow conditions, budget, and features
- **Real-time Progress Tracking** - Visual progress bar and step indicators
- **Instant Recommendations** - Personalized snowplow suggestions based on answers
- **Beautiful Animations** - Smooth transitions and micro-interactions using Framer Motion

### Comprehensive Knowledge Center
- **Snowplow Types** - Front-mounted, wing plows, underbody scrapers
- **Material Comparisons** - Steel, polyethylene, stainless steel, tungsten carbide
- **Vehicle Compatibility** - Detailed sizing guides for different truck types
- **Cost Analysis** - Investment breakdowns and ROI calculations
- **Safety & Training** - Operator protection and training requirements
- **Maintenance Guide** - Pre-season, daily, and weekly maintenance checklists

### Modern UI/UX
- **Responsive Design** - Optimized for all devices and screen sizes
- **Glass Morphism Effects** - Beautiful backdrop blur and transparency
- **Gradient Design** - Custom color schemes with snow and ice themes
- **Micro-interactions** - Hover effects, button animations, and smooth transitions
- **Accessibility** - Proper contrast ratios and keyboard navigation

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth, performant animations
- **Form Handling**: React Hook Form for efficient form management
- **Icons**: Lucide React for consistent, scalable icons
- **Intersection Observer**: React Intersection Observer for scroll-based animations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snowplow-selector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SnowplowQuiz.tsx          # Interactive quiz component
│   ├── RecommendationDisplay.tsx  # Results and recommendations
│   ├── KnowledgeCenter.tsx        # Comprehensive information center
│   ├── Header.tsx                 # Navigation header
│   └── Footer.tsx                 # Footer with contact info
├── App.tsx                        # Main application component
├── main.tsx                       # React entry point
└── index.css                      # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Ice**: Light blue tones for accents
- **Snow**: Gray scale for text and backgrounds
- **Success**: Green for positive actions
- **Warning**: Orange for important notices

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Fluid typography scaling

### Animations
- **Page Transitions**: Fade and slide effects
- **Component Animations**: Scale, opacity, and transform effects
- **Micro-interactions**: Button hover states and form feedback
- **Scroll Animations**: Intersection observer-based reveals

## 🔧 Customization

### Adding New Quiz Questions
1. Update the `questions` array in `SnowplowQuiz.tsx`
2. Add corresponding logic in `RecommendationDisplay.tsx`
3. Update the recommendation engine as needed

### Modifying Recommendations
1. Edit the `getRecommendation` function in `RecommendationDisplay.tsx`
2. Add new recommendation logic based on quiz combinations
3. Update the knowledge center content accordingly

### Styling Changes
1. Modify `tailwind.config.js` for theme changes
2. Update `src/index.css` for global styles
3. Use the existing design system classes for consistency

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic with Vite
- **Lazy Loading**: Components load as needed
- **Optimized Images**: WebP format with fallbacks
- **Minimal Bundle**: Tree-shaking and dead code elimination
- **Caching**: Proper cache headers for static assets

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Structured Data**: JSON-LD for rich snippets
- **Performance**: Core Web Vitals optimization
- **Accessibility**: WCAG 2.1 AA compliance

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, contact:
- **Email**: info@mtech.com
- **Phone**: (123) 456-7890
- **Service Areas**: Ohio, Michigan, Indiana, Kentucky, Western Pennsylvania

---

**Built with ❄️ for snow removal professionals** 