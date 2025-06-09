"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore.js";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";

import MyIdeas from "./pages/dashboard/entrepreneur/MyIdeas";
import CreateIdea from "./pages/dashboard/entrepreneur/CreateIdea";
import EditIdea from "./pages/dashboard/entrepreneur/EditIdea";
import MyConnections from "./pages/dashboard/entrepreneur/MyConnections";
import AskQuery from "./pages/dashboard/entrepreneur/AskQuery";

import BrowseIdeas from "./pages/dashboard/investor/BrowseIdeas";
import IdeaDetails from "./pages/dashboard/investor/IdeaDetails";
import MyProposals from "./pages/dashboard/investor/MyProposals";
import CreateProposal from "./pages/dashboard/investor/CreateProposal";
import EditProposal from "./pages/dashboard/investor/EditProposal";

import MyLoanOffers from "./pages/dashboard/banker/MyLoanOffers";
import CreateLoanOffer from "./pages/dashboard/banker/CreateLoanOffer";
import EditLoanOffer from "./pages/dashboard/banker/EditLoanOffer";

import QueriesList from "./pages/dashboard/advisor/QueriesList";
import MyAdvice from "./pages/dashboard/advisor/MyAdvice";
import CreateAdvice from "./pages/dashboard/advisor/CreateAdvice";
import EditAdvice from "./pages/dashboard/advisor/EditAdvice";

import ProfilePage from "./pages/dashboard/ProfilePage";
import BrowseAdvice from "./pages/BrowseAdvice";
import AdviceDetails from "./pages/AdviceDetails";
import BrowseLoanOffers from "./pages/BrowseLoanOffers";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="advice" element={<BrowseAdvice />} />
          <Route path="advice/:id" element={<AdviceDetails />} />
          <Route path="loans" element={<BrowseLoanOffers />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />

          <Route
            path="my-ideas"
            element={
              <RoleBasedRoute allowedRoles={["entrepreneur"]}>
                <MyIdeas />
              </RoleBasedRoute>
            }
          />
          <Route
            path="create-idea"
            element={
              <RoleBasedRoute allowedRoles={["entrepreneur"]}>
                <CreateIdea />
              </RoleBasedRoute>
            }
          />
          <Route
            path="edit-idea/:id"
            element={
              <RoleBasedRoute allowedRoles={["entrepreneur"]}>
                <EditIdea />
              </RoleBasedRoute>
            }
          />
          <Route
            path="my-connections"
            element={
              <RoleBasedRoute allowedRoles={["entrepreneur", "investor"]}>
                <MyConnections />
              </RoleBasedRoute>
            }
          />
          <Route
            path="ask-query"
            element={
              <RoleBasedRoute allowedRoles={["entrepreneur"]}>
                <AskQuery />
              </RoleBasedRoute>
            }
          />

          <Route
            path="browse-ideas"
            element={
              <RoleBasedRoute allowedRoles={["investor"]}>
                <BrowseIdeas />
              </RoleBasedRoute>
            }
          />
          <Route
            path="idea/:id"
            element={
              <RoleBasedRoute allowedRoles={["investor"]}>
                <IdeaDetails />
              </RoleBasedRoute>
            }
          />
          <Route
            path="my-proposals"
            element={
              <RoleBasedRoute allowedRoles={["investor"]}>
                <MyProposals />
              </RoleBasedRoute>
            }
          />
          <Route
            path="create-proposal"
            element={
              <RoleBasedRoute allowedRoles={["investor"]}>
                <CreateProposal />
              </RoleBasedRoute>
            }
          />
          <Route
            path="edit-proposal/:id"
            element={
              <RoleBasedRoute allowedRoles={["investor"]}>
                <EditProposal />
              </RoleBasedRoute>
            }
          />

          {/* Banker Routes */}
          <Route
            path="my-loan-offers"
            element={
              <RoleBasedRoute allowedRoles={["banker"]}>
                <MyLoanOffers />
              </RoleBasedRoute>
            }
          />
          <Route
            path="create-loan-offer"
            element={
              <RoleBasedRoute allowedRoles={["banker"]}>
                <CreateLoanOffer />
              </RoleBasedRoute>
            }
          />
          <Route
            path="edit-loan-offer/:id"
            element={
              <RoleBasedRoute allowedRoles={["banker"]}>
                <EditLoanOffer />
              </RoleBasedRoute>
            }
          />

          {/* Advisor Routes */}
          <Route
            path="queries"
            element={
              <RoleBasedRoute allowedRoles={["advisor"]}>
                <QueriesList />
              </RoleBasedRoute>
            }
          />
          <Route
            path="my-advice"
            element={
              <RoleBasedRoute allowedRoles={["advisor"]}>
                <MyAdvice />
              </RoleBasedRoute>
            }
          />
          <Route
            path="create-advice"
            element={
              <RoleBasedRoute allowedRoles={["advisor"]}>
                <CreateAdvice />
              </RoleBasedRoute>
            }
          />
          <Route
            path="edit-advice/:id"
            element={
              <RoleBasedRoute allowedRoles={["advisor"]}>
                <EditAdvice />
              </RoleBasedRoute>
            }
          />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
