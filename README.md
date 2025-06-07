# Deepak Shukla - Personal Portfolio

A modern, responsive, and interactive personal portfolio website built with React, Tailwind CSS, and Framer Motion. This portfolio showcases my skills, projects, achievements, and professional journey as a B.Tech Computer Science student.

## 🌟 Features

### Design & User Experience
- **Modern UI/UX**: Clean, professional, and visually appealing design
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **Smooth Animations**: Page transitions and scroll animations using Framer Motion
- **Interactive Elements**: Hover effects, button animations, and dynamic components

### Pages & Sections
- **Home**: Animated hero section with typing effect and scroll indicators
- **About**: Personal information, education timeline, and interests
- **Skills**: Categorized technical skills with progress bars and filtering
- **Projects**: Project showcase with category filtering and detailed modal views
- **Achievements**: Certifications, awards, and academic achievements
- **Resume**: PDF viewer with download functionality and structured resume display
- **Contact**: Contact form with validation and social media links

### Technical Features
- **React Router**: Client-side routing with animated page transitions
- **Context API**: Theme management and state handling
- **Form Handling**: Contact form with validation and submission states
- **PDF Integration**: Resume viewing and download functionality
- **SEO Optimized**: Meta tags and structured data for better search engine visibility
- **Performance Optimized**: Fast loading times and smooth interactions

## 🚀 Technologies Used

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **Framer Motion**: Animation library for smooth transitions

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Additional styling for unique components
- **Responsive Design**: Mobile-first approach

### Icons & Assets
- **React Icons**: Comprehensive icon library
- **Lucide React**: Modern icon set
- **Custom SVGs**: Optimized vector graphics

### Additional Libraries
- **React PDF**: PDF viewing and handling
- **AOS**: Animate On Scroll library
- **Context API**: State management

## 📂 Project Structure

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── BackToTop.jsx       # Scroll to top button
│   │   ├── Footer.jsx          # Footer component
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── Preloader.jsx       # Loading animation
│   ├── contexts/
│   │   └── ThemeContext.jsx    # Dark/light mode context
│   ├── data/
│   │   ├── achievements.js     # Achievement data
│   │   └── projects.js         # Project data
│   ├── pages/
│   │   ├── About.jsx           # About page
│   │   ├── Achievements.jsx    # Achievements page
│   │   ├── Contact.jsx         # Contact page
│   │   ├── Home.jsx            # Home page
│   │   ├── Projects.jsx        # Projects page
│   │   ├── Resume.jsx          # Resume page
│   │   └── Skills.jsx          # Skills page
│   ├── utils/                  # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # Entry point
│   └── style.css              # Global styles
├── index.html                  # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.cjs         # PostCSS configuration
└── README.md                  # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js**: Version 16 or higher
- **npm**: Package manager (comes with Node.js)

### Clone the Repository
```bash
git clone https://github.com/deepak-158/portfolio.git
cd portfolio
```

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- **Desktop**: 1920px and above
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎨 Customization

### Personal Information
Update your personal information in the following files:
- `src/pages/Home.jsx` - Hero section content
- `src/pages/About.jsx` - Personal details and education
- `src/pages/Contact.jsx` - Contact information
- `src/pages/Resume.jsx` - Resume data

### Projects & Achievements
- `src/data/projects.js` - Add your projects
- `src/data/achievements.js` - Add your achievements and certifications

### Styling
- `tailwind.config.js` - Customize colors, fonts, and design tokens
- `src/style.css` - Add custom CSS styles

### Theme Colors
The portfolio uses a custom color palette defined in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  }
  // ... more colors
}
```

## 🌐 Deployment

This project is configured for easy deployment on Vercel with automatic builds from GitHub.

### Vercel Deployment (Recommended)

1. **Create GitHub Repository** (if not done already):
   ```bash
   git remote add origin https://github.com/deepak-158/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository: `deepak-158/portfolio`
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"

3. **Automatic Deployments**:
   - Every push to `main` branch will trigger automatic deployment
   - Preview deployments for pull requests
   - Custom domain setup available

### Configuration Files
- `vercel.json` - Deployment configuration with security headers
- `vite.config.js` - Build optimization and plugin configuration

### Alternative Deployment Options

#### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up continuous deployment from GitHub

#### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

### Environment Variables
No environment variables required for basic deployment. If you add external APIs, configure them in your deployment platform.

## 📄 Features in Detail

### Home Page
- Animated typing effect for introduction
- Smooth scroll indicators
- Call-to-action buttons
- Professional hero section

### About Page
- Interactive education timeline
- Personal interests and hobbies
- Professional summary
- Downloadable resume link

### Skills Page
- Categorized skill display
- Animated progress bars
- Skill filtering system
- Technology icons

### Projects Page
- Project filtering by category
- Detailed project modals
- Technology stack display
- Live demo and source code links

### Achievements Page
- Certification showcase
- Awards and recognition
- Academic achievements
- Credential verification links

### Resume Page
- PDF viewer integration
- Downloadable resume
- Print functionality
- Structured resume data

### Contact Page
- Contact form with validation
- Social media links
- Location information
- Quick response indicators

## 🔧 Technical Implementation

### State Management
- React Context API for theme management
- Local state management with useState
- Form state handling with controlled components

### Animation System
- Framer Motion for page transitions
- Scroll-triggered animations
- Hover and click animations
- Loading animations

### Performance Optimization
- Code splitting with React.lazy
- Image optimization
- Bundle size optimization
- Fast refresh development

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styling Issues**
```bash
# Rebuild Tailwind CSS
npm run build
```

**Development Server Issues**
```bash
# Restart development server
npm run dev
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Vite** for the fast build tool
- **React Icons** for the comprehensive icon library

---

**Built with ❤️ by Deepak Shukla**

*Last updated: June 2025*
