import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lightbulb,
  Users,
  Landmark,
  MessageSquare,
} from "lucide-react";
import Home from "../assets/home.jpg";

const HomePage = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                Connecting Entrepreneurs with Investors
              </h1>
              <p className="mb-8 text-lg text-teal-100">
                Bridge the gap between innovative ideas and funding. Our
                platform connects entrepreneurs, investors, bankers, and
                advisors to help bring great ideas to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center rounded-md bg-white px-6 py-3 font-medium text-teal-700 shadow-md transition-colors hover:bg-teal-50"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-teal-600"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={Home}
                alt="Entrepreneurs and Investors"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Our platform makes it easy to connect, collaborate, and grow
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="mb-4 text-xl font-bold">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up as an entrepreneur, investor, banker, or advisor and
                create your detailed profile.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="mb-4 text-xl font-bold">Connect & Collaborate</h3>
              <p className="text-gray-600">
                Browse ideas or investment opportunities, make connections, and
                start meaningful conversations.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="mb-4 text-xl font-bold">Grow & Succeed</h3>
              <p className="text-gray-600">
                Turn ideas into reality with funding, advice, and resources from
                our diverse community of professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Features for Every User
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Our platform offers specialized tools for each type of user
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">For Entrepreneurs</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Share your business ideas</li>
                <li>• Connect with potential investors</li>
                <li>• Get expert advice</li>
                <li>• Access loan opportunities</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">For Investors</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Discover promising startups</li>
                <li>• Create investment proposals</li>
                <li>• Connect with entrepreneurs</li>
                <li>• Track your investments</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">For Bankers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Offer business loans</li>
                <li>• Reach potential clients</li>
                <li>• Showcase financial products</li>
                <li>• Support local businesses</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">For Advisors</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Share your expertise</li>
                <li>• Answer entrepreneur queries</li>
                <li>• Publish advice articles</li>
                <li>• Build your professional network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              See how our platform has helped entrepreneurs and investors
              achieve their goals
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <img
                  src="https://ui-avatars.com/api/?name=Priya+Sharma&background=0D9488&color=fff"
                  alt="Priya Sharma"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Bridge helped me connect with the perfect investor for my
                sustainable fashion startup. Within three months, we secured
                funding and valuable mentorship."
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <img
                  src="https://ui-avatars.com/api/?name=Rajiv+Mehta&background=0D9488&color=fff"
                  alt="Rajiv Mehta"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Rajiv Mehta</h4>
                  <p className="text-sm text-gray-600">Investor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As an investor, Bridge has streamlined my deal flow. I've
                discovered innovative startups that I wouldn't have found
                otherwise, leading to two successful investments."
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <img
                  src="https://ui-avatars.com/api/?name=Ananya+Patel&background=0D9488&color=fff"
                  alt="Ananya Patel"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Ananya Patel</h4>
                  <p className="text-sm text-gray-600">Advisor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Being an advisor on Bridge has allowed me to share my expertise
                with promising entrepreneurs while expanding my professional
                network. It's a win-win for everyone involved."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-teal-100">
              Join our community of entrepreneurs, investors, bankers, and
              advisors today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="rounded-md bg-white px-6 py-3 font-medium text-teal-700 shadow-md transition-colors hover:bg-teal-50"
              >
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-teal-600"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
