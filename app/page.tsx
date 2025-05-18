import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Scan, BarChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scan className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FaceTrack</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium hover:text-primary"
            >
              Benefits
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Modernize Attendance Tracking with Facial Recognition
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Eliminate manual roll calls and paper records. Our AI-powered
              system automatically tracks attendance with high accuracy and
              minimal disruption.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-lg"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg border">
                <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                  <Scan className="h-16 w-16 text-primary/40" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded-full"></div>
                  <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                  <div className="flex justify-end mt-2">
                    <div className="h-8 w-24 bg-primary/20 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our facial recognition attendance system offers everything you
              need to streamline your attendance tracking process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Scan className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Facial Recognition</h3>
              <p className="text-gray-600">
                Advanced AI algorithms accurately identify students and staff in
                seconds, even in varying lighting conditions.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Instantly record attendance data and get notifications for late
                arrivals or absences.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Comprehensive Reports
              </h3>
              <p className="text-gray-600">
                Generate detailed attendance reports by class, student, or time
                period with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our system is designed to be simple, efficient, and non-intrusive.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-primary/20"></div>

              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">
                      Student Registration
                    </h3>
                    <p className="text-gray-600">
                      Students register with their information and have their
                      facial data securely captured and stored.
                    </p>
                  </div>
                  <div className="z-10 order-0 md:order-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white md:mx-auto">
                    1
                  </div>
                  <div className="order-2 md:order-3 md:w-1/2 md:pl-8 hidden md:block"></div>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 md:pr-8 hidden md:block"></div>
                  <div className="z-10 order-0 md:order-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white md:mx-auto">
                    2
                  </div>
                  <div className="order-2 md:order-3 md:w-1/2 md:pl-8 mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Camera Setup</h3>
                    <p className="text-gray-600">
                      Cameras are installed at entry points or classrooms to
                      capture faces as students enter.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">
                      Automatic Recognition
                    </h3>
                    <p className="text-gray-600">
                      The system automatically identifies students and marks
                      attendance in real-time.
                    </p>
                  </div>
                  <div className="z-10 order-0 md:order-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white md:mx-auto">
                    3
                  </div>
                  <div className="order-2 md:order-3 md:w-1/2 md:pl-8 hidden md:block"></div>
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  <div className="order-1 md:order-1 md:w-1/2 md:pr-8 hidden md:block"></div>
                  <div className="z-10 order-0 md:order-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white md:mx-auto">
                    4
                  </div>
                  <div className="order-2 md:order-3 md:w-1/2 md:pl-8">
                    <h3 className="text-xl font-semibold mb-2">
                      Data Analysis
                    </h3>
                    <p className="text-gray-600">
                      Administrators can access reports, track patterns, and
                      export data for further analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose FaceTrack?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our facial recognition attendance system offers numerous
              advantages over traditional methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Time Efficiency</h3>
                <p className="text-gray-600">
                  Save up to 15 minutes per class by eliminating manual roll
                  calls.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Improved Accuracy
                </h3>
                <p className="text-gray-600">
                  Eliminate human error and proxy attendance with 99.7%
                  recognition accuracy.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Data Security</h3>
                <p className="text-gray-600">
                  All facial data is encrypted and stored securely, complying
                  with privacy regulations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Seamless Integration
                </h3>
                <p className="text-gray-600">
                  Easily integrates with existing school management systems and
                  databases.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Cost Reduction</h3>
                <p className="text-gray-600">
                  Reduce administrative costs associated with manual attendance
                  tracking.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Contactless Solution
                </h3>
                <p className="text-gray-600">
                  Provides a hygienic, touch-free attendance solution for
                  health-conscious environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Attendance System?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of educational institutions already using FaceTrack to
            streamline their attendance process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
              >
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scan className="h-6 w-6 text-white" />
                <span className="font-bold text-xl text-white">FaceTrack</span>
              </div>
              <p className="text-sm mb-4">
                Modern facial recognition attendance management system for
                educational institutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Data Processing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} FaceTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
