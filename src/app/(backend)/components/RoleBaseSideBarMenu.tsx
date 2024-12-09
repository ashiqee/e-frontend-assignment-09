import { FiFileText, FiDollarSign, FiBarChart2, FiSettings, FiShoppingCart, FiUser } from "react-icons/fi";

export const roleBasedMenus = {
  admin: [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <FiFileText />,
    },
    {
      path: "/admin/content",
      label: "Manage Content",
      icon: <FiFileText />,
    },
    {
      path: "/admin/payments",
      label: "Manage Payments",
      icon: <FiDollarSign />,
    },
    {
      path: "/admin/analytics",
      label: "Analytics",
      icon: <FiBarChart2 />,
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <FiSettings />,
    },
  ],
  vendor: [
    {
      path: "/vendor/dashboard",
      label: "Dashboard",
      icon: <FiFileText />,
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
