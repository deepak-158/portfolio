export const projects = [
  {
    id: 1,
    title: "Velocity Offroad",
    description: "A comprehensive automotive e-commerce platform for offroad vehicle accessories, featuring advanced product catalog, user authentication, and seamless shopping experience.",
    longDescription: "Velocity Offroad is a fully functional e-commerce website specializing in offroad vehicle accessories and parts. Built with modern web technologies, it offers an intuitive shopping experience with features like advanced product filtering, user account management, secure checkout process, and responsive design optimized for all devices.",
    image: "/api/placeholder/600/400",
    tags: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
    category: "fullstack",
    demoUrl: "https://velocity-offroad.vercel.app",
    githubUrl: "https://github.com/deepak-158/velocity-offroad",
    featured: true,
    status: "completed",
    technologies: {
      frontend: ["React", "Redux", "CSS3", "React Router"],
      backend: ["Node.js", "Express.js", "JWT Authentication"],
      database: ["MongoDB", "Mongoose"],
      payment: ["Stripe API"],
      deployment: ["Vercel", "MongoDB Atlas"]
    },
    features: [
      "Product catalog with advanced filtering",
      "User authentication and profiles",
      "Shopping cart and wishlist",
      "Secure payment processing",
      "Order management system",
      "Admin dashboard",
      "Responsive mobile design",
      "SEO optimized"
    ]
  },
  {
    id: 2,
    title: "40 Days 40 Projects Challenge",
    description: "A collection of 40 unique web development projects built over 40 consecutive days, showcasing diverse skills from vanilla JavaScript to React applications.",
    longDescription: "This ambitious project challenge involved creating 40 different web applications over 40 days, each focusing on different aspects of web development. Projects range from simple DOM manipulation exercises to complex React applications, demonstrating progressive skill development and consistency in coding practice.",
    image: "/api/placeholder/600/400",
    tags: ["JavaScript", "React", "CSS3", "HTML5", "API Integration"],
    category: "frontend",
    demoUrl: "https://40-days-40-projects.netlify.app",
    githubUrl: "https://github.com/deepak-158/40-days-40-projects",
    featured: true,
    status: "completed",
    technologies: {
      frontend: ["Vanilla JavaScript", "React", "CSS3", "HTML5"],
      apis: ["Various Public APIs", "Fetch API"],
      tools: ["Git", "VS Code", "Netlify"],
      deployment: ["Netlify", "Vercel"]
    },
    features: [
      "40 unique project implementations",
      "Progressive difficulty levels",
      "Vanilla JS to React progression",
      "API integrations",
      "Responsive designs",
      "Interactive user interfaces",
      "Clean code practices",
      "Version control with Git"
    ]
  },
  {
    id: 3,
    title: "Smart Parking System",
    description: "An IoT-based smart parking management system with real-time slot monitoring, automated billing, and mobile app integration for seamless parking experience.",
    longDescription: "The Smart Parking System revolutionizes urban parking management through IoT sensors and intelligent software. The system provides real-time parking slot availability, automated entry/exit management, digital payment processing, and comprehensive analytics for parking administrators.",
    image: "/api/placeholder/600/400",
    tags: ["IoT", "Arduino", "React", "Firebase", "Node.js"],
    category: "iot",
    demoUrl: "https://smart-parking-demo.vercel.app",
    githubUrl: "https://github.com/deepak-158/smart-parking-system",
    featured: true,
    status: "completed",
    technologies: {
      hardware: ["Arduino", "Ultrasonic Sensors", "RFID", "ESP32"],
      frontend: ["React", "Material-UI", "CSS3"],
      backend: ["Node.js", "Express.js", "Firebase Functions"],
      database: ["Firebase Firestore", "Real-time Database"],
      mobile: ["React Native"]
    },
    features: [
      "Real-time slot monitoring",
      "Automated vehicle detection",
      "Mobile app for users",
      "Digital payment integration",
      "Admin dashboard",
      "Parking analytics",
      "RFID-based access control",
      "SMS/Email notifications"
    ]
  },
  {
    id: 4,
    title: "OCR Extract & Translate",
    description: "An intelligent document processing application that extracts text from images using OCR technology and provides real-time translation to multiple languages.",
    longDescription: "This application combines Optical Character Recognition (OCR) with machine translation to create a powerful document processing tool. Users can upload images containing text in any language, extract the text accurately, and translate it to their preferred language instantly.",
    image: "/api/placeholder/600/400",
    tags: ["Python", "OCR", "Machine Learning", "Flask", "React"],
    category: "ml",
    demoUrl: "https://ocr-translate.herokuapp.com",
    githubUrl: "https://github.com/deepak-158/ocr-extract-translate",
    featured: true,
    status: "completed",
    technologies: {
      backend: ["Python", "Flask", "Tesseract OCR", "Google Translate API"],
      frontend: ["React", "Axios", "Bootstrap"],
      ml: ["OpenCV", "PIL", "Preprocessing Algorithms"],
      deployment: ["Heroku", "Vercel"]
    },
    features: [
      "Image text extraction",
      "Multi-language support",
      "Real-time translation",
      "Batch processing",
      "Text formatting preservation",
      "Download extracted text",
      "Image preprocessing",
      "Accuracy optimization"
    ]
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React showcasing projects, skills, and professional journey with interactive animations and smooth user experience.",
    longDescription: "This portfolio website serves as a comprehensive showcase of my web development skills and projects. Built with React and modern CSS, it features smooth animations, responsive design, interactive project galleries, and optimized performance. The site includes sections for projects, about me, skills, and contact information.",
    image: "/api/placeholder/600/400",
    tags: ["React", "CSS3", "JavaScript", "Responsive Design"],
    category: "frontend",
    demoUrl: "https://deepak-portfolio.vercel.app",
    githubUrl: "https://github.com/deepak-158/portfolio",
    featured: false,
    status: "completed",
    technologies: {
      frontend: ["React", "CSS3", "JavaScript", "HTML5"],
      animations: ["CSS Transitions", "Keyframes"],
      deployment: ["Vercel", "Netlify"],
      tools: ["VS Code", "Git", "Figma"]
    },
    features: [
      "Responsive mobile-first design",
      "Interactive project showcase",
      "Smooth scroll animations",
      "Contact form integration",
      "SEO optimized",
      "Fast loading performance",
      "Cross-browser compatibility",
      "Modern UI/UX design"
    ]
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description: "A real-time weather application providing detailed weather information, forecasts, and interactive maps with location-based services and beautiful visualizations.",
    longDescription: "This weather dashboard offers comprehensive weather information with real-time data from multiple weather APIs. Features include current weather conditions, extended forecasts, interactive weather maps, location search, and beautiful data visualizations with responsive design for all devices.",
    image: "/api/placeholder/600/400",
    tags: ["JavaScript", "Weather API", "Charts.js", "CSS3"],
    category: "frontend",
    demoUrl: "https://weather-dash-deepak.vercel.app",
    githubUrl: "https://github.com/deepak-158/weather-dashboard",
    featured: false,
    status: "completed",
    technologies: {
      frontend: ["Vanilla JavaScript", "HTML5", "CSS3"],
      apis: ["OpenWeatherMap API", "Geolocation API"],
      visualization: ["Chart.js", "CSS Animations"],
      deployment: ["Vercel"]
    },
    features: [
      "Real-time weather data",
      "7-day weather forecast",
      "Location-based services",      "Interactive weather charts",
      "City search functionality",
      "Weather condition animations",
      "Temperature unit conversion",
      "Mobile-responsive design"
    ]
  }
];

export const projectCategories = [
  { id: 'all', name: 'All Projects', count: projects.length },
  { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
  { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
  { id: 'iot', name: 'IoT', count: projects.filter(p => p.category === 'iot').length },
  { id: 'ml', name: 'Machine Learning', count: projects.filter(p => p.category === 'ml').length },
];

export const featuredProjects = projects.filter(project => project.featured);
