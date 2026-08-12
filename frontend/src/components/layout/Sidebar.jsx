import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBasket,
  User,
  UserStar,
} from "lucide-react";

const menuItems = [
  {
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
  },
  { path: "/clients", icon: <Users size={20} />, label: "Clients" },
  { path: "/products", icon: <ShoppingBasket size={20} />, label: "Products" },
  { path: "/orders", icon: <Package size={20} />, label: "Orders" },
  { path: "/users", icon: <Users size={20} />, label: "Users" },
  { path: "/profile", icon: <UserStar size={20} />, label: "Profile" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="user-panel">
        <div className="user-icon">
          <User size={22} />
        </div>
        <div className="user-info">
          <p className="user-name">Youssef errachid</p>
          <p className="user-role">ADMIN</p>
        </div>
      </div>
    </aside>
  );
}
