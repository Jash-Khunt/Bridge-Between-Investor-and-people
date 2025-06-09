"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-xl text-teal-100">
              Have questions or need support? We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Send us a message
              </h2>
              {submitted ? (
                <div className="rounded-lg bg-green-50 p-6 text-center">
                  <div className="mb-4 text-4xl">✅</div>
                  <h3 className="mb-2 text-lg font-medium text-green-800">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-600">
                    We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-400"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Get in touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      123 Innovation Street
                      <br />
                      Bandra Kurla Complex
                      <br />
                      Mumbai, Maharashtra 400051
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 98765 43211 (Support)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@bridge-connect.com</p>
                    <p className="text-gray-600">support@bridge-connect.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Find us on the map
                </h3>
                <div className="h-64 rounded-lg bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">
                    Interactive map would be embedded here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-900">
                How do I get started on Bridge?
              </h3>
              <p className="text-gray-600">
                Simply sign up for an account, choose your role (entrepreneur,
                investor, banker, or advisor), and complete your profile. You
                can then start exploring opportunities or posting your own.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-900">
                Is Bridge free to use?
              </h3>
              <p className="text-gray-600">
                Yes, Bridge is free to join and use. We believe in democratizing
                access to entrepreneurial opportunities for everyone.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-900">
                How do you verify users?
              </h3>
              <p className="text-gray-600">
                We have a comprehensive verification process that includes email
                verification, phone verification, and document verification for
                certain user types.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-900">
                Can I change my role after signing up?
              </h3>
              <p className="text-gray-600">
                Currently, roles cannot be changed after registration. If you
                need to change your role, please contact our support team for
                assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
