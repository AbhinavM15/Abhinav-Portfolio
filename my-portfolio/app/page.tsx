'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, ReactNode } from 'react';

// Upgraded High-Performance Animation Component
type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ""
}: { 
  children: ReactNode; 
  delay?: number; 
  direction?: Direction;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const directionClasses = {
    up: 'translate-y-12',
    down: '-translate-y-12',
    left: '-translate-x-12',
    right: 'translate-x-12',
    none: 'translate-y-0 translate-x-0'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0' 
          : `opacity-0 ${directionClasses[direction]} scale-[0.98] blur-[4px]`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans overflow-hidden">
      
      {/* Navigation */}
      <nav className="max-w-4xl mx-auto flex justify-between items-center py-6 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wider text-blue-400">AM.</h1>
        <div className="space-x-6 text-sm flex flex-wrap">
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
          <a href="#publications" className="hover:text-blue-400 transition-colors">Publications</a>
        </div>
      </nav>

      {/* Hero & Contact Section */}
      <section id="about" className="max-w-4xl mx-auto mt-24 mb-32 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1">
          <FadeIn direction="left" delay={100}>
            <h2 className="text-5xl font-extrabold mb-4 leading-tight">
              Abhinav Mishra
            </h2>
            <h3 className="text-xl text-blue-400 font-semibold mb-6">
              MS Computer Science Candidate @ TU Dresden | Google Cloud Certified
            </h3>
          </FadeIn>
          
          {/* Scannable Contact Bar */}
          <FadeIn direction="left" delay={200}>
            <div className="flex flex-col gap-3 text-sm text-gray-300 mb-8 border-l-4 border-blue-500 pl-4 bg-gray-800/50 p-4 rounded-r-lg hover:bg-gray-800/80 transition-colors duration-300">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                  📍 Dresden, Germany
                </span>
                <span className="flex items-center gap-2">
                  📧 <a href="mailto:abhinavmishra2526@gmail.com" className="hover:text-blue-400 transition-colors">abhinavmishra2526@gmail.com</a>
                </span>
                <span className="flex items-center gap-2">
                  📱 <a href="tel:+4915235816416" className="hover:text-blue-400 transition-colors">+49 1523 5816416</a>
                </span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span className="flex items-center gap-2">
                  🔗 <a href="https://www.linkedin.com/in/abhinav-m-95a1b8199" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={300}>
            <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
              I&apos;m a Master of Science in Computer Science candidate at TU Dresden and a Google Cloud Certified Associate Cloud Engineer with professional experience as a Data Engineer Analyst at Deloitte USI. I&apos;ve built everything from interactive AI agents to automated DevOps pipelines that bridge the gap between data and production deployment. <strong className="text-blue-400 font-semibold">Currently based in Dresden</strong>, I&apos;m looking for a Werkstudent role where I can apply my expertise in Data Engineering and AI to help an engineering team tackle complex technical challenges.
            </p>
            
            <div className="flex space-x-4">
              <a href="#experience" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)]">
                View My Work
              </a>
              <a href="https://scholar.google.com/citations?user=07OvWo4AAAAJ&amp;hl=en" target="_blank" rel="noreferrer" className="border border-gray-600 hover:border-gray-400 text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gray-800/30 hover:bg-gray-800">
                Google Scholar
              </a>
            </div>
          </FadeIn>
        </div>
        
        {/* Profile Image */}
        <FadeIn direction="right" delay={250}>
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <Image
              src="/profile.jpeg"
              alt="Abhinav Mishra"
              width={240}
              height={240}
              className="relative rounded-full object-cover border-4 border-gray-800 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              priority
            />
          </div>
        </FadeIn>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="max-w-4xl mx-auto mb-24">
        <FadeIn>
          <h3 className="text-3xl font-bold mb-10 border-l-4 border-blue-500 pl-4">Work Experience</h3>
        </FadeIn>
        <div className="space-y-12 border-l border-gray-700 ml-2">
          
          {/* Deloitte */}
          <FadeIn delay={100} direction="up">
            <div className="pl-6 relative group">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-2 shadow-[0_0_12px_rgba(59,130,246,0.9)] transition-transform duration-300 group-hover:scale-150"></div>
              <h4 className="text-xl font-bold">Analyst</h4>
              <p className="text-blue-400 font-semibold mb-4">Deloitte USI, Hyderabad <span className="text-gray-500 font-normal text-sm block md:inline">Jan 2024 — Mar 2026</span></p>
              
              <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
                <div className="p-5 bg-gray-800/30 rounded-lg border border-transparent hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg">
                  <span className="font-bold text-gray-200 block mb-2 border-b border-gray-700 pb-1 text-base">Enterprise AI Agent Development</span>
                  <ul className="list-disc list-outside space-y-2 ml-4">
                    <li><strong className="text-gray-300">Building a Full-Stack AI Interface:</strong> I was a core contributor to a firm-wide initiative to build an interactive AI Agent. This involved a heavy mix of GCP for infrastructure and Python for the backend logic. I used Snowflake and Cortex Search to handle the heavy lifting of data retrieval, while building the front-end in Streamlit to make the tool actually usable for the team.</li>
                    <li><strong className="text-gray-300">Automating the Backend:</strong> Beyond the AI logic, I spent a lot of time writing custom Linux and Python scripts to bridge the gap between our data sources and the agent. This wasn&apos;t just about writing code; it was about making sure the data pipelines were resilient and that the agent could scale as more users jumped on.</li>
                  </ul>
                </div>

                <div className="p-5 bg-gray-800/30 rounded-lg border border-transparent hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg">
                  <span className="font-bold text-gray-200 block mb-2 border-b border-gray-700 pb-1 text-base">DevOps Leadership (US Telecom Project)</span>
                  <ul className="list-disc list-outside space-y-2 ml-4">
                    <li><strong className="text-gray-300">Leading at Scale:</strong> I took the lead for the DevOps team on a high-stakes project for one of the largest telecom companies in the US. My day-to-day involved balancing technical oversight with team coordination, ensuring our infrastructure could keep up with the massive scale and security requirements of the telecommunications industry.</li>
                    <li><strong className="text-gray-300">Streamlining the Path to Production:</strong> A huge part of my focus was modernizing how we shipped code. I rebuilt our Jenkins pipelines from the ground up to handle the promotion of code through various environments. By integrating GitLab more effectively into our workflow, I helped the team move away from manual bottlenecks and toward a more reliable, automated deployment process.</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* TML Business Service Ltd */}
          <FadeIn delay={200} direction="up">
            <div className="pl-6 relative group">
              <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-2 transition-all duration-300 group-hover:bg-blue-400 group-hover:scale-150"></div>
              <h4 className="text-xl font-bold">Digital Transformation Intern</h4>
              <p className="text-blue-400 font-semibold mb-4">TML Business Service Ltd, Pune <span className="text-gray-500 font-normal text-sm block md:inline">Jan 2023 — Jun 2023</span></p>
              
              <div className="space-y-4 p-5 bg-gray-800/30 rounded-lg border border-transparent hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg">
                <p className="text-gray-400 text-sm leading-relaxed">
                  During my time at Tata Motors, I developed a custom chatbot using the Rasa Framework to modernize the internal supply chain ticketing process. The primary goal was to automate the categorization and routing of logistics issues that were previously handled manually. To achieve this, I implemented Natural Language Processing (NLP) for intent classification, ensuring the bot could accurately identify the user&apos;s specific supply chain bottleneck. I utilized Entity Recognition to extract critical data like shipment IDs and vendor codes directly from user queries.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  By leveraging word embeddings and attention models, I enabled the bot to maintain context during complex, multi-turn conversations about delivery delays. This reduced the time spent on manual ticket triage and improved the speed of resolution for the logistics team. The system effectively bridged the gap between raw user input and the backend ticketing database. Ultimately, this project turned a high-volume manual task into a streamlined, automated conversational experience. It served as a scalable solution for handling enterprise-level supply chain communication. By focusing on deep learning techniques, I ensured the bot could handle the technical jargon specific to the automotive industry.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Symbiosis Centre */}
          <FadeIn delay={300} direction="up">
            <div className="pl-6 relative group">
              <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-2 transition-all duration-300 group-hover:bg-blue-400 group-hover:scale-150"></div>
              <h4 className="text-xl font-bold">AI Research Intern</h4>
              <p className="text-blue-400 font-semibold mb-4">Symbiosis Centre for Applied AI, Pune <span className="text-gray-500 font-normal text-sm block md:inline">Aug 2020 — Jun 2022</span></p>
              
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed p-5 bg-gray-800/30 rounded-lg border border-transparent hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg">
                <p>
                  I led multiple research initiatives focused on the intersection of artificial intelligence and medical diagnostics. This hands-on research involved managing complex databases (DBMS), engineering custom deep learning architectures, and visualizing high-dimensional data to prove model efficacy. This work culminated in the publication of three independent research papers in top-tier (Q1) academic journals and scientific publications:
                </p>
                <ul className="list-disc list-outside space-y-3 ml-4">
                  <li>
                    <strong className="text-gray-300">Lung Image Segmentation (Published in Neural Computing and Applications):</strong> Developed and trained an optimized deep learning architecture designed to accurately isolate and segment lung regions in medical scans, providing a cleaner baseline for automated diagnostics.
                  </li>
                  <li>
                    <strong className="text-gray-300">ECG Signal Processing &amp; Classification (Published in Sensors):</strong> Engineered a custom Convolutional Neural Network (CNN) paired with an advanced denoising pipeline. This approach successfully cleaned raw, noisy electrocardiogram (ECG) data to accurately classify heart activity patterns.
                  </li>
                  <li>
                    <strong className="text-gray-300">Dermoscopy Image Classification (Published in IoT Sensors, ML, AI and XAI):</strong> Built an automated computer vision pipeline utilizing deep learning techniques to analyze dermoscopy images, assisting in the rapid and accurate classification of various skin lesions.
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Education & Skills Grid - SIMPLIFIED ANIMATIONS */}
      <section className="max-w-4xl mx-auto mb-24 grid md:grid-cols-2 gap-12">
        <FadeIn direction="up">
          <div>
            <h3 className="text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Education</h3>
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:border-blue-500/50 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h4 className="text-lg font-bold">Master of Science</h4>
                <p className="text-blue-400 mb-2 font-semibold">Computer Science</p>
                <p className="text-gray-300 text-sm font-medium">Technische Universität Dresden</p>
                <div className="flex justify-between items-center mt-2 text-gray-500 text-xs">
                  <span>04/2026 — Present</span>
                  <span>Dresden, Germany</span>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 transition-all duration-500 hover:shadow-lg hover:border-gray-500 hover:-translate-y-1">
                <h4 className="text-lg font-bold">Bachelor of Technology</h4>
                <p className="text-blue-400 mb-2 font-semibold">Computer Science &amp; Engineering</p>
                <p className="text-gray-300 text-sm font-medium">Symbiosis International University</p>
                <div className="flex justify-between items-center mt-2 text-gray-500 text-xs">
                  <span>07/2019 — 07/2023</span>
                  <span>Pune, India</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={150}>
          <div>
            <h3 className="text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Python', 'SQL', 'MySQL', 'GCP', 'Snowflake', 'Jenkins', 'GitLab', 
                'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'scikit-learn', 
                'Pandas', 'NumPy', 'Time-Series Analysis', 'Anomaly Detection', 'Denoising Techniques', 
                'Feature Extraction', 'Data Preprocessing', 'Model Evaluation', 'Experiment Design', 
                'Data Warehousing', 'Documentation','CI/CD','DevOps','Streamlit','Rasa','Linux','Java','JavaFX','TensorBoard','Seaborn','Matplotlib','Computer Vision','NLP','CNN'
              ].map((skill) => (
                <span key={skill} className="bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:shadow-md cursor-default inline-block">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Engineering Projects Section */}
      <section id="projects" className="max-w-4xl mx-auto mb-24">
        <FadeIn>
          <h3 className="text-3xl font-bold mb-10 border-l-4 border-blue-500 pl-4">Engineering Projects</h3>
        </FadeIn>
        <div className="space-y-8">
          
          <FadeIn delay={100} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] group">
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Machine Learning Spam Classifier</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                I engineered an end-to-end NLP machine learning pipeline to automatically classify a dataset of over 5,500 messages as either spam or legitimate. Using Pandas for data cleaning, I transformed the raw text into mathematical features by applying TF-IDF vectorization. I then trained a Logistic Regression classification model using Scikit-Learn, utilizing train-test splits to ensure the model could generalize to new data. The project culminated in a real-time predictive system that achieved an impressive 96.5% accuracy rate on unseen test data.
              </p>
              <div className="flex gap-2 mt-6">
                <span className="text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded text-blue-300 group-hover:border-blue-500/50 transition-colors">NLP</span>
                <span className="text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded text-blue-300 group-hover:border-blue-500/50 transition-colors">Logistic Regression</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] group">
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">NLP-Powered Fake News Classification System</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                I developed a robust, NLP-powered machine learning pipeline designed to automatically detect and classify news articles as real or fake. By processing a dataset of over 20,800 articles, I applied advanced natural language processing techniques—including Porter Stemming and stopword removal—to clean and isolate core text features. I then engineered numerical feature vectors using TF-IDF vectorization and trained a Logistic Regression model via Scikit-Learn. Utilizing a stratified train-test split to ensure balanced validation, the model achieved an outstanding 97.9% accuracy rate on unseen data.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] group">
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Gold Price Forecasting Model using Random Forest</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                I developed an advanced machine learning regression model to forecast gold prices (GLD) based on key financial indicators, including the S&amp;P 500, Crude Oil, Silver, and the EUR/USD exchange rate. Through comprehensive exploratory data analysis, I utilized Seaborn to map correlation heatmaps and identify the underlying relationships between these global market features. To capture the complex, non-linear patterns within the financial data, I engineered a predictive pipeline using Scikit-Learn and trained a robust Random Forest Regressor. Evaluated via an 80/20 train-test split, the ensemble model achieved an exceptional R-squared score of 0.988.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={400} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] group">
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Credit Risk Classification System</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                I developed a machine learning classification system designed to predict bank loan approvals based on applicant demographics and financial history. Using Pandas, I rigorously preprocessed a dataset of loan applications by dropping missing values and encoding complex categorical variables—such as education level, dependent count, and property area—into structured numerical formats. I trained a Support Vector Machine (SVM) classifier with a linear kernel via Scikit-Learn, utilizing a stratified 90/10 train-test split to ensure balanced class representation.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={500} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] group">
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Online Hospital Management System</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                I developed a centralized healthcare platform using Java and JavaFX to facilitate remote consultations during the COVID-19 pandemic. The application featured a robust User Authentication system and a comprehensive Patient Management dashboard, allowing for secure medical record handling and appointment scheduling. To ensure a reliable user experience, I integrated automated Prescription Management and a notification engine for appointment reminders and critical alerts. On the backend, I engineered a MySQL database architecture, writing optimized SQL queries to manage high-volume data retrieval and ensure seamless synchronization.
              </p>
              <div className="flex gap-2 mt-6">
                <span className="text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded text-blue-300 group-hover:border-blue-500/50 transition-colors">JavaFX</span>
                <span className="text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded text-blue-300 group-hover:border-blue-500/50 transition-colors">MySQL</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={600} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:border-blue-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] group">
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">E-Commerce Database Architecture (BigBasket Clone)</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                This project involved the end-to-end design and implementation of a scalable database management system for a high-traffic online grocery platform. I began by architecting a complex Entity-Relationship Diagram (ERD) to map out the intricate relationships between products, multi-tiered customer profiles, and order histories. I then translated this logic into a high-performance MySQL schema, implementing primary/foreign key constraints and indexing to ensure data integrity and rapid query execution. The final system was optimized to handle real-time inventory tracking and order processing.
              </p>
              <div className="flex gap-2 mt-6">
                <span className="text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded text-blue-300 group-hover:border-blue-500/50 transition-colors">ERD Design</span>
                <span className="text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded text-blue-300 group-hover:border-blue-500/50 transition-colors">Relational Modeling</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="max-w-4xl mx-auto mb-24">
        <FadeIn>
          <h3 className="text-3xl font-bold mb-10 border-l-4 border-blue-500 pl-4">Research &amp; Publications</h3>
        </FadeIn>
        <div className="space-y-10">
          
          {/* Lung Segmentation Publication */}
          <FadeIn delay={100} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/50 hover:-translate-y-2 group">
              <p className="text-xs text-blue-400 mb-2 font-semibold tracking-wide">2022 | Neural Computing and Applications (Springer)</p>
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-300 transition-colors">Enhanced lung image segmentation using deep learning</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                I evaluated four deep learning architectures—FCN, SegNet, U-Net, and U-Net++—to identify the most precise model for clinical lung segmentation. I utilized the Montgomery and Shenzhen datasets to train the networks, focusing on bridging semantic gaps between encoders and decoders. The U-Net++ model achieved a state-of-the-art Accuracy of 98.74%, significantly outperforming traditional frameworks in medical imaging tasks. By implementing redesigned skip pathways, I reached a Dice Coefficient of 0.9796, ensuring high-fidelity overlap with radiologist ground truth. I identified that FCN and SegNet are unsuitable for clinical application due to their inability to handle pixel-level localization effectively. This work establishes a robust architectural foundation for the automated diagnosis of respiratory abnormalities like Pneumonia and COPD.
              </p>
              
              <div className="overflow-x-auto border border-gray-700 rounded-lg mb-6 group-hover:border-gray-600 transition-colors">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs text-gray-300 uppercase bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3">Model</th>
                      <th className="px-4 py-3">Accuracy</th>
                      <th className="px-4 py-3">Dice Coefficient</th>
                      <th className="px-4 py-3">Mean IoU</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700 bg-gray-800/80 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-bold text-white">U-Net++</td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">98.74%</td>
                      <td className="px-4 py-3">0.9796</td>
                      <td className="px-4 py-3">0.9598</td>
                    </tr>
                    <tr className="border-b border-gray-700 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">U-Net</td>
                      <td className="px-4 py-3">95.55%</td>
                      <td className="px-4 py-3">0.9217</td>
                      <td className="px-4 py-3">0.8572</td>
                    </tr>
                    <tr className="border-b border-gray-700 bg-gray-800/80 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">SegNet</td>
                      <td className="px-4 py-3">84.09%</td>
                      <td className="px-4 py-3">0.7914</td>
                      <td className="px-4 py-3">0.6558</td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">FCN</td>
                      <td className="px-4 py-3">78.32%</td>
                      <td className="px-4 py-3">0.6962</td>
                      <td className="px-4 py-3">0.5343</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <a href="https://link.springer.com/article/10.1007/s00521-021-06719-8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-all text-sm hover:gap-3">
                Read the Full Paper
                <svg className="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </FadeIn>

          {/* Skin Lesions Publication */}
          <FadeIn delay={150} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/50 hover:-translate-y-2 group">
              <p className="text-xs text-blue-400 mb-2 font-semibold tracking-wide">2024 | IoT Sensors, ML, AI and XAI: Empowering A Smarter World</p>
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-300 transition-colors">Skin Lesions Classification of Dermoscopy Images Using Deep Learning Technique</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                This research evaluates several deep learning models for the multi-class classification of skin lesions using the HAM10000 dataset to aid in computer-aided diagnosis. EfficientNet emerged as the highest-performing model, achieving a validation accuracy of <span className="text-blue-400 font-semibold">89.31%</span> and high specificity of <span className="text-blue-400 font-semibold">98.85%</span> through its compound scaling operation. 
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Intermediate performance was noted for InceptionNet and MobileNet, both reaching 88.20% validation accuracy, followed by Inception ResNet-V2 at 86.14%. VGG-16 provided the poorest results with 59.61% accuracy, though an ensemble combining it with ResNet-50 improved classification accuracy to 70%. The methodology utilized U-Net for precise image segmentation and implemented XAI methods, specifically Lime and Grad-CAM, to improve human trust in the algorithmic outputs. Ultimately, the study concludes that accurate classification is vital to prevent medical misdiagnosis, which can have irrevocable consequences for patient health.
              </p>
              
              <a href="https://link.springer.com/chapter/10.1007/978-3-031-68602-3_23" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-all text-sm hover:gap-3">
                Read the Full Paper
                <svg className="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </FadeIn>
          
          {/* ECG Publication */}
          <FadeIn delay={200} direction="up">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/50 hover:-translate-y-2 group">
              <p className="text-xs text-blue-400 mb-2 font-semibold tracking-wide">2022 | Sensors (MDPI)</p>
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-300 transition-colors">ECG Data Analysis with Denoising Approach and Customized CNNs</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                This research evaluates several ECG denoising filters, identifying the Median and Gaussian filters as the most effective with peak signal-to-noise ratios (PSNR) of 87.3 and 86.5, respectively. Building on this, three custom 1D-Convolutional Neural Network (CCNN) architectures were developed to automate the detection of coronary artery disease from heartbeat segments. Validation results demonstrate that Model-2 achieved the highest accuracy at <span className="text-blue-400 font-semibold">93.25%</span>, significantly outperforming the other iterations. These architectures provide a robust diagnostic solution by integrating automated feature extraction and eliminating the need for complex manual QRS detection. While the models require fixed-length signals, the implementation is highly economical and efficient for hardware deployment due to the use of 1D convolutions. This project establishes a scalable framework for early cardiovascular screening, offering a reliable, cost-effective tool for clinicians in resource-limited settings.
              </p>

              {/* Filter Comparison Table */}
              <h5 className="text-sm font-bold text-gray-300 mb-3 ml-1">Comparison of the Filters</h5>
              <div className="overflow-x-auto border border-gray-700 rounded-lg mb-8 group-hover:border-gray-600 transition-colors">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs text-gray-300 uppercase bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3">Filters</th>
                      <th className="px-4 py-3">PSNR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700 bg-gray-800/80 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">Wavelet Transform</td>
                      <td className="px-4 py-3">56.9</td>
                    </tr>
                    <tr className="border-b border-gray-700 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">Low-Pass Butterworth Filter</td>
                      <td className="px-4 py-3">78.6</td>
                    </tr>
                    <tr className="border-b border-gray-700 bg-gray-800/80 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">Savitzky–Golay Filter</td>
                      <td className="px-4 py-3">80.5</td>
                    </tr>
                    <tr className="border-b border-gray-700 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">Moving Average</td>
                      <td className="px-4 py-3">81.05</td>
                    </tr>
                    <tr className="border-b border-gray-700 bg-gray-800/80 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-bold text-white">Gaussian Filter</td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">86.5</td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-bold text-white">Median Filter</td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">87.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Validation Results Table */}
              <h5 className="text-sm font-bold text-gray-300 mb-3 ml-1">Validation Results of the Models</h5>
              <div className="overflow-x-auto border border-gray-700 rounded-lg mb-8 group-hover:border-gray-600 transition-colors">
                <table className="w-full text-sm text-left text-gray-400 whitespace-nowrap">
                  <thead className="text-xs text-gray-300 uppercase bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3">Model</th>
                      <th className="px-4 py-3">Loss</th>
                      <th className="px-4 py-3">Accuracy</th>
                      <th className="px-4 py-3">Sensitivity</th>
                      <th className="px-4 py-3">Specificity</th>
                      <th className="px-4 py-3">Recall</th>
                      <th className="px-4 py-3">Precision</th>
                      <th className="px-4 py-3">F1-Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700 bg-gray-800/80 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">Model-3</td>
                      <td className="px-4 py-3">0.3831</td>
                      <td className="px-4 py-3">0.8671</td>
                      <td className="px-4 py-3">0.4081</td>
                      <td className="px-4 py-3">0.8250</td>
                      <td className="px-4 py-3">0.3888</td>
                      <td className="px-4 py-3">0.4351</td>
                      <td className="px-4 py-3">0.3833</td>
                    </tr>
                    <tr className="border-b border-gray-700 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-medium text-gray-200">Model-1</td>
                      <td className="px-4 py-3">0.3171</td>
                      <td className="px-4 py-3">0.8737</td>
                      <td className="px-4 py-3">0.4525</td>
                      <td className="px-4 py-3">0.8502</td>
                      <td className="px-4 py-3">0.4030</td>
                      <td className="px-4 py-3">0.4438</td>
                      <td className="px-4 py-3">0.3859</td>
                    </tr>
                    <tr className="bg-gray-800/80 transition-colors hover:bg-gray-700/80">
                      <td className="px-4 py-3 font-bold text-white">Model-2</td>
                      <td className="px-4 py-3">0.2754</td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">0.9325</td>
                      <td className="px-4 py-3">0.4214</td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">0.8625</td>
                      <td className="px-4 py-3">0.4214</td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">0.5207</td>
                      <td className="px-4 py-3 text-blue-400 font-semibold">0.4338</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <a href="https://www.mdpi.com/1424-8220/22/5/1928" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-all text-sm hover:gap-3">
                Read the Full Paper
                <svg className="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Awards & Community */}
      <section className="max-w-4xl mx-auto mb-32 grid md:grid-cols-2 gap-12">
        <FadeIn direction="up">
          <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Awards &amp; Leadership</h3>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-4">
              <li className="leading-relaxed">Received applause award for leading the DevOps team and commitment to achieving deliverables on time (Jan 2025).</li>
              <li className="leading-relaxed">Led multiple projects and research papers with combined citations of <strong className="text-gray-200">253</strong>.</li>
              <li className="leading-relaxed">Led Valorant gaming competition in techfest, 2022.</li>
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={150} direction="up">
          <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Community Involvement</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Raised money for the Akshaya Patra Foundation via a social media event in December 2021 to help feed and arrange basic needs for struggling individuals.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Abhinav Mishra. Built with Next.js &amp; Tailwind.</p>
      </footer>

    </main>
  );
}