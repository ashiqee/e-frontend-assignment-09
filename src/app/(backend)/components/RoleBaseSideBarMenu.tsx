import { FiFileText, FiDollarSign, FiBarChart2, FiSettings, FiShoppingCart, FiUser, FiShoppingBag, FiList, FiEye } from "react-icons/fi";

export const roleBasedMenus = {
  admin: [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <FiFileText />,
    },
    {
      path: "/admin/users",
      label: "Manage Users",
      icon: <FiUser />,
      description: "Manage vendors and customers, suspend or delete accounts.",
    },
    {
      path: "/admin/blacklist",
      label: "Blacklist Shops",
      icon: <FiShoppingCart />,
      description: "Restrict operations of vendor shops.",
    },
    {
      path: "/admin/categories",
      label: "Manage Categories",
      icon: <FiList />,
      description: "Add, edit, or delete product categories dynamically.",
    },
    {
      path: "/admin/transactions",
      label: "Monitor Transactions",
      icon: <FiDollarSign />,
      description: "Review and track platform transactions.",
    },
    {
      path: "/admin/activities",
      label: "Review Activities",
      icon: <FiEye />,
      description: "Monitor activities across the platform.",
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <FiSettings />,
      description: "Platform configurations and preferences.",
    },
  ],
  vendor: [
    {
      path: "/vendor/dashboard",
      label: "Dashboard",
      icon: <FiFileText />,
    },
    {
      path: "/vendor/shop",
      label: "Manage Shops",
      icon: <FiShoppingBag />,
    },
    {
      path: "/vendor/products",
      label: "Manage Products",
      icon: <FiShoppingCart />,
    },
    {
      path: "/vendor/orders",
      label: "Manage Orders",
      icon: <FiFileText />,
    },
    {
      path: "/vendor/payments",
      label: "Payments",
      icon: <FiDollarSign />,
    },
    {
      path: "/vendor/settings",
      label: "Settings",
      icon: <FiSettings />,
    },
  ],
  customer: [
    {
      path: "/customer/home",
      label: "Home",
      icon: <FiFileText />,
    },
    {
      path: "/customer/orders",
      label: "My Orders",
      icon: <FiShoppingCart />,
    },
    {
      path: "/customer/wishlist",
      label: "Wishlist",
      icon: <FiFileText />,
    },
    {
      path: "/customer/profile",
      label: "Profile",
      icon: <FiUser />,
    },
    {
      path: "/customer/settings",
      label: "Settings",
      icon: <FiSettings />,
    },
  ],
};
