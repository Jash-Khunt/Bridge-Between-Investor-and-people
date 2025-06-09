"use client";

import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useBusinessIdeaStore } from "../../store/businessIdeaStore";
import { useConnectionStore } from "../../store/connectionStore";
import { useProposalStore } from "../../store/proposalStore";
import { useLoanOfferStore } from "../../store/loanOfferStore";
import { useAdviceStore } from "../../store/adviceStore";
import { useQueryStore } from "../../store/queryStore";

import {
  Users,
  Lightbulb,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const user = useAuthStore((state) => state.user);

  const ideas = useBusinessIdeaStore((state) => state.ideas);
  const fetchIdeas = useBusinessIdeaStore((state) => state.getAllIdeas);

  const connections = useConnectionStore((state) => state.connections);
  const fetchConnections = useConnectionStore((state) => state.getConnections);

  const proposals = useProposalStore((state) => state.proposals);
  const fetchProposals = useProposalStore((state) => state.getAllProposals);

  const loans = useLoanOfferStore((state) => state.loanOffers);
  const fetchLoans = useLoanOfferStore((state) => state.getAllLoanOffers);

  const adviceList = useAdviceStore((state) => state.adviceList);
  const fetchAdviceList = useAdviceStore((state) => state.getAllAdvice);

  const queries = useQueryStore((state) => state.queries);
  const fetchQueries = useQueryStore((state) => state.getAllQueries);

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "entrepreneur":
        fetchIdeas();
        fetchConnections();
        fetchQueries({ entrepreneurId: user._id });
        break;
      case "investor":
        fetchProposals({investorId: user._id});
        fetchConnections();
        break;
      case "banker":
        fetchLoans({ bankerId: user._id });
        break;
      case "advisor":
        fetchAdviceList({ advisorId: user._id });
        fetchQueries({ advisorId: user._id });
        break;
    }
  }, [user?.role, user._id]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getRoleSpecificStats = () => {
    switch (user?.role) {
      case "entrepreneur":
        return [
          {
            name: "My Ideas",
            value: ideas.length.toString(),
            icon: Lightbulb,
            color: "bg-blue-500",
          },
          {
            name: "Connections",
            value: connections.length.toString(),
            icon: Users,
            color: "bg-green-500",
          },
          {
            name: "Funding Received",
            value:
              "$" +
              ideas.reduce(
                (sum, idea) => sum + (idea.fundingReceived || 0),
                0
              ) +
              "K",
            icon: DollarSign,
            color: "bg-yellow-500",
          },
          {
            name: "Messages",
            value: queries.filter((q) => q.from === user._id).length.toString(),
            icon: MessageSquare,
            color: "bg-purple-500",
          },
        ];
      case "investor":
        return [
          {
            name: "Ideas Viewed",
            value: proposals
              .filter((p) => p.investorId === user._id)
              .length.toString(),
            icon: Eye,
            color: "bg-blue-500",
          },
          {
            name: "Investments",
            value: proposals
              .filter((p) => p.status === "accepted")
              .length.toString(),
            icon: DollarSign,
            color: "bg-green-500",
          },
          {
            name: "Portfolio Value",
            value:
              "$" +
              proposals
                .reduce((sum, p) => sum + (p.investedAmount || 0), 0)
                .toLocaleString(),
            icon: TrendingUp,
            color: "bg-yellow-500",
          },
          {
            name: "Connections",
            value: connections.length.toString(),
            icon: Users,
            color: "bg-purple-500",
          },
        ];
      case "banker":
        return [
          {
            name: "Loan Offers",
            value: loans
              .filter((l) => l.bankerId === user._id)
              .length.toString(),
            icon: DollarSign,
            color: "bg-blue-500",
          },
          {
            name: "Applications",
            value: loans
              .reduce((acc, l) => acc + (l.applications?.length || 0), 0)
              .toString(),
            icon: Users,
            color: "bg-green-500",
          },
          {
            name: "Approved Loans",
            value:
              "$" +
              loans
                .filter((l) => l.status === "approved")
                .reduce((sum, l) => sum + (l.amount || 0), 0)
                .toLocaleString(),
            icon: TrendingUp,
            color: "bg-yellow-500",
          },
          {
            name: "Active Clients",
            value: loans.filter((l) => l.status === "active").length.toString(),
            icon: MessageSquare,
            color: "bg-purple-500",
          },
        ];
      case "advisor":
        return [
          {
            name: "Advice Articles",
            value: adviceList.length.toString(),
            icon: Lightbulb,
            color: "bg-blue-500",
          },
          {
            name: "Queries Answered",
            value: queries
              .filter(
                (q) => q.advisorId === user._id && q.status === "answered"
              )
              .length.toString(),
            icon: MessageSquare,
            color: "bg-green-500",
          },
          {
            name: "Followers",
            value: user.followers?.length?.toString() || "0",
            icon: Users,
            color: "bg-yellow-500",
          },
          {
            name: "Rating",
            value: user.rating?.toFixed(1).toString() || "0.0",
            icon: TrendingUp,
            color: "bg-purple-500",
          },
        ];
      default:
        return [];
    }
  };

  const getQuickActions = () => {
    switch (user?.role) {
      case "entrepreneur":
        return [
          {
            name: "Create New Idea",
            href: "/dashboard/create-idea",
            icon: Plus,
          },
          {
            name: "Browse Investors",
            href: "/dashboard/browse-investors",
            icon: Users,
          },
          {
            name: "Ask for Advice",
            href: "/dashboard/ask-query",
            icon: MessageSquare,
          },
        ];
      case "investor":
        return [
          { name: "Browse Ideas", href: "/dashboard/browse-ideas", icon: Eye },
          {
            name: "Create Proposal",
            href: "/dashboard/create-proposal",
            icon: Plus,
          },
          {
            name: "My Investments",
            href: "/dashboard/my-proposals",
            icon: DollarSign,
          },
        ];
      case "banker":
        return [
          {
            name: "Create Loan Offer",
            href: "/dashboard/create-loan-offer",
            icon: Plus,
          },
          {
            name: "View Applications",
            href: "/dashboard/loan-applications",
            icon: Users,
          },
          {
            name: "My Loan Offers",
            href: "/dashboard/my-loan-offers",
            icon: DollarSign,
          },
        ];
      case "advisor":
        return [
          {
            name: "Write Advice",
            href: "/dashboard/create-advice",
            icon: Plus,
          },
          {
            name: "Answer Queries",
            href: "/dashboard/queries",
            icon: MessageSquare,
          },
          {
            name: "My Articles",
            href: "/dashboard/my-advice",
            icon: Lightbulb,
          },
        ];
      default:
        return [];
    }
  };

  const stats = getRoleSpecificStats();
  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
        <h1 className="text-2xl font-bold">
          {getWelcomeMessage()}, {user?.name}!
        </h1>
        <p className="mt-2 text-teal-100">
          Welcome to your {user?.role} dashboard. Here's what's happening with
          your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className={`rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <action.icon className="h-5 w-5 text-teal-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  {action.name}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <p className="text-sm text-gray-600">
              Your profile was updated successfully
            </p>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
            <p className="text-sm text-gray-600">
              New connection request received
            </p>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <p className="text-sm text-gray-600">Welcome to Bridge platform!</p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
