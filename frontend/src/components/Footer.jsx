import { Link } from "react-router-dom";
import { Github, Linkedin, Code } from "lucide-react";
import logo from "../assets/logo.jpg";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Bridge Logo" className="h-10 w-10" />
              <span className="ml-2 text-xl font-bold text-teal-400">
                Bridge
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Connecting entrepreneurs with investors, bankers, and advisors to
              help bring innovative ideas to life.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://github.com/Jash-Khunt/Bridge-Between-Investor-and-people"
                className="text-gray-400 transition-colors hover:text-teal-400"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jash-khunt-ba5970283/"
                className="text-gray-400 transition-colors hover:text-teal-400"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://leetcode.com/u/jashkhunt11/"
                className="text-gray-400 transition-colors hover:text-teal-400"
              >
                <Code className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/advice"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Advice
                </Link>
              </li>
              <li>
                <Link
                  to="/loans"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Loan Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-400">
              For Users
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/signup"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Entrepreneurs
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Bankers
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-300 transition-colors hover:text-teal-400"
                >
                  Advisors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-400">
              Contact Us
            </h3>
            <address className="not-italic">
              <p className="text-gray-300">123 Innovation Street</p>
              <p className="text-gray-300">Mumbai, Maharashtra 400001</p>
              <p className="mt-3 text-gray-300">
                Email: info@bridge-connect.com
              </p>
              <p className="text-gray-300">Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Bridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
