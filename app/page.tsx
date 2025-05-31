"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Scan, BarChart, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown; // Allow other props
}

function AnimatedSection({
  children,
  className = "",
  ...props
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Scan className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="font-bold text-xl text-foreground">FaceTrack</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Features", "How It Works", "Benefits"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center space-x-4"
          >
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform duration-200"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="hover:scale-105 transition-transform duration-200"
              >
                Register
              </Button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-card border-t"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {["Features", "How It Works", "Benefits"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-muted/30 to-accent/10 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2 space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              >
                Modernize Attendance Tracking with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Facial Recognition
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              >
                Eliminate manual roll calls and paper records. Our AI-powered
                system automatically tracks attendance with high accuracy and
                minimal disruption.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="w-full sm:w-auto shadow-lg">
                      Get Started
                    </Button>
                  </motion.div>
                </Link>
                <Link href="#how-it-works">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md">
                <motion.div
                  className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl"
                  animate={{ rotate: [0, 1, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative bg-card p-6 rounded-2xl shadow-2xl border"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="aspect-video bg-muted rounded-xl mb-4 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Scan className="h-16 w-16 text-primary/60" />
                    </motion.div>
                  </motion.div>
                  <div className="space-y-3">
                    {[0.75, 1, 0.85].map((width, index) => (
                      <motion.div
                        key={index}
                        className="h-4 bg-muted rounded-full"
                        style={{ width: `${width * 100}%` }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      />
                    ))}
                    <div className="flex justify-end mt-4">
                      <motion.div
                        className="h-8 w-24 bg-primary/20 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            >
              Powerful Features
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our facial recognition attendance system offers everything you
              need to streamline your attendance tracking process.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Scan,
                title: "Facial Recognition",
                description:
                  "Advanced AI algorithms accurately identify students and staff in seconds, even in varying lighting conditions.",
              },
              {
                icon: Clock,
                title: "Real-time Tracking",
                description:
                  "Instantly record attendance data and get notifications for late arrivals or absences.",
              },
              {
                icon: BarChart,
                title: "Comprehensive Reports",
                description:
                  "Generate detailed attendance reports by class, student, or time period with just a few clicks.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <motion.div
                  className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-muted/30 via-background to-accent/5"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our system is designed to be simple, efficient, and non-intrusive.
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-primary to-secondary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Steps */}
              <motion.div variants={staggerContainer} className="space-y-12">
                {[
                  {
                    title: "Student Registration",
                    description:
                      "Students register with their information and have their facial data securely captured and stored.",
                    side: "left",
                  },
                  {
                    title: "Camera Setup",
                    description:
                      "Cameras are installed at entry points or classrooms to capture faces as students enter.",
                    side: "right",
                  },
                  {
                    title: "Automatic Recognition",
                    description:
                      "The system automatically identifies students and marks attendance in real-time.",
                    side: "left",
                  },
                  {
                    title: "Data Analysis",
                    description:
                      "Administrators can access reports, track patterns, and export data for further analysis.",
                    side: "right",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    variants={step.side === "left" ? fadeInLeft : fadeInRight}
                    className="relative flex flex-col md:flex-row items-center md:items-start"
                  >
                    <div
                      className={`order-1 md:w-1/2 ${
                        step.side === "left"
                          ? "md:pr-8 md:text-right"
                          : "md:pl-8"
                      } mb-4 md:mb-0 ${
                        step.side === "right" ? "md:order-3" : ""
                      }`}
                    >
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    <motion.div
                      className={`z-10 order-0 md:order-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground md:mx-auto font-semibold`}
                      whileHover={{ scale: 1.2 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div
                      className={`order-2 md:w-1/2 ${
                        step.side === "left"
                          ? "hidden md:block md:order-3"
                          : "hidden md:block md:order-1"
                      }`}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection id="benefits" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            >
              Why Choose FaceTrack?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our facial recognition attendance system offers numerous
              advantages over traditional methods.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                title: "Time Efficiency",
                description:
                  "Save up to 15 minutes per class by eliminating manual roll calls.",
              },
              {
                title: "Improved Accuracy",
                description:
                  "Eliminate human error and proxy attendance with 99.7% recognition accuracy.",
              },
              {
                title: "Data Security",
                description:
                  "All facial data is encrypted and stored securely, complying with privacy regulations.",
              },
              {
                title: "Seamless Integration",
                description:
                  "Easily integrates with existing school management systems and databases.",
              },
              {
                title: "Cost Reduction",
                description:
                  "Reduce administrative costs associated with manual attendance tracking.",
              },
              {
                title: "Contactless Solution",
                description:
                  "Provides a hygienic, touch-free attendance solution for health-conscious environments.",
              },
            ].map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 group"
              >
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors duration-200">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={staggerContainer}>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Transform Your Attendance System?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
            >
              Join hundreds of educational institutions already using FaceTrack
              to streamline their attendance process.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto shadow-lg"
                  >
                    Get Started Free
                  </Button>
                </motion.div>
              </Link>
              <Link href="#contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Request Demo
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scan className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl text-foreground">
                  FaceTrack
                </span>
              </div>
              <p className="text-sm mb-4 text-muted-foreground">
                Modern facial recognition attendance management system for
                educational institutions.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    name: "Twitter",
                    path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                  },
                  {
                    name: "LinkedIn",
                    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d={social.path}
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Case Studies", "Documentation"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Contact"],
              },
              {
                title: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Data Processing",
                  "Cookie Policy",
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-foreground font-semibold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-border mt-12 pt-8 text-sm text-center"
          >
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} FaceTrack. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
