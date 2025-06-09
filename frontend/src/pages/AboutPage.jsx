import { Users, Target, Award, Globe } from "lucide-react";
import story from "../assets/story.jpg";
const AboutPage = () => {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      image:
        "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D9488&color=fff",
      bio: "Former investment banker with 15+ years of experience in startup funding.",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image:
        "https://ui-avatars.com/api/?name=Priya+Sharma&background=0D9488&color=fff",
      bio: "Tech entrepreneur and software architect passionate about connecting innovators.",
    },
    {
      name: "Amit Patel",
      role: "Head of Business Development",
      image:
        "https://ui-avatars.com/api/?name=Amit+Patel&background=0D9488&color=fff",
      bio: "Expert in building strategic partnerships and scaling business operations.",
    },
    {
      name: "Sneha Reddy",
      role: "Head of Marketing",
      image:
        "https://ui-avatars.com/api/?name=Sneha+Reddy&background=0D9488&color=fff",
      bio: "Digital marketing specialist focused on community building and growth.",
    },
  ];

  const stats = [
    { label: "Active Users", value: "10,000+" },
    { label: "Successful Connections", value: "2,500+" },
    { label: "Funding Raised", value: "₹500Cr+" },
    { label: "Cities Covered", value: "50+" },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              About Bridge
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-teal-100">
              We're on a mission to democratize entrepreneurship by connecting
              innovative minds with the resources they need to succeed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                To bridge the gap between innovative entrepreneurs and potential
                investors, creating a thriving ecosystem where great ideas can
                flourish and transform into successful businesses that benefit
                society.
              </p>
            </div>
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600">
                To become India's leading platform for entrepreneurial
                collaboration, where every innovative idea has the opportunity
                to find the right support, funding, and guidance to make a
                positive impact on the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our Impact
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
              Numbers that showcase the growing Bridge community and its success
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-teal-600">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Bridge was founded in 2023 by a team of entrepreneurs and
                  investors who experienced firsthand the challenges of
                  connecting innovative ideas with the right funding and
                  support.
                </p>
                <p>
                  After witnessing countless brilliant ideas struggle to find
                  investors, and investors missing out on promising
                  opportunities, we decided to create a platform that would
                  solve this fundamental problem in the startup ecosystem.
                </p>
                <p>
                  Today, Bridge has grown into a thriving community of
                  entrepreneurs, investors, bankers, and advisors, all working
                  together to build the future of Indian entrepreneurship.
                </p>
              </div>
            </div>
            <div>
              <img
                src={story}
                alt="Our Story"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Meet Our Team
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
              The passionate individuals behind Bridge's success
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 text-center shadow-md"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="mx-auto mb-4 h-24 w-24 rounded-full"
                />
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-teal-600">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our Values
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Community First
              </h3>
              <p className="text-gray-600">
                We believe in the power of community and collaboration to drive
                innovation and success.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from our platform
                to our customer service.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Impact</h3>
              <p className="text-gray-600">
                We measure our success by the positive impact we create for
                entrepreneurs and the broader economy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
