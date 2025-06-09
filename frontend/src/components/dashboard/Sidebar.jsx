import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import logo from "../../assets/logo.jpg";
import {
  LayoutDashboard,
  Lightbulb,
  Users,
  FileText,
  HelpCircle,
  MessageSquare,
  Landmark,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = ({ className = "" }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getNavItems = () => {
    const commonItems = [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        name: "Profile",
        path: "/dashboard/profile",
        icon: <User className="h-5 w-5" />,
      },
    ];

    const roleSpecificItems = {
      entrepreneur: [
        {
          name: "Ideas",
          path: "/dashboard/my-ideas",
          icon: <Lightbulb className="h-5 w-5" />,
        },
        {
          name: "My Connections",
          path: "/dashboard/my-connections",
          icon: <Users className="h-5 w-5" />,
        },
        {
          name: "Ask Query",
          path: "/dashboard/ask-query",
          icon: <HelpCircle className="h-5 w-5" />,
        },
      ],
      investor: [
        {
          name: "Browse Ideas",
          path: "/dashboard/browse-ideas",
          icon: <Lightbulb className="h-5 w-5" />,
        },
        {
          name: "My Proposals",
          path: "/dashboard/my-proposals",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          name: "My Connections",
          path: "/dashboard/my-connections",
          icon: <Users className="h-5 w-5" />,
        },
      ],
      banker: [
        {
          name: "My Loan Offers",
          path: "/dashboard/my-loan-offers",
          icon: <Landmark className="h-5 w-5" />,
        },
      ],
      advisor: [
        {
          name: "Queries",
          path: "/dashboard/queries",
          icon: <HelpCircle className="h-5 w-5" />,
        },
        {
          name: "My Advice",
          path: "/dashboard/my-advice",
          icon: <MessageSquare className="h-5 w-5" />,
        },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user?.role] || [])];
  };

  return (
    <div className={`w-64 flex-shrink-0 bg-gray-800 text-white ${className}`}>
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Bridge Logo" className="h-8 w-8" />
          <span className="ml-2 text-xl font-bold text-teal-400">Bridge</span>
        </Link>
      </div>

      <div className="p-4">
        <div className="mb-6 rounded-lg bg-gray-700 p-4">
          <p className="text-sm font-medium text-gray-300">Logged in as</p>
          <p className="text-base font-semibold text-white">{user?.name}</p>
          <p className="text-xs capitalize text-gray-400">{user?.role}</p>
        </div>

        <nav className="space-y-1">
          {getNavItems().map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                isActive(item.path)
                  ? "bg-teal-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}

          <button
            onClick={logout}
            className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
