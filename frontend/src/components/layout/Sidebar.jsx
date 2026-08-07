import {NavLink} from 'react-router-dom';
import "../../styles/Sidebar.css";
import {LayoutDashboard,Users,Package,ShoppingBasket,Info,User,Settings}from 'lucide-react';

const menuItems = [
    {
        path:"/dashboard",
        icon:<LayoutDashboard size={25} />,
        label:"Dashboard"
    },
    {
        path:"/clients",
        icon:<Users size={25} />,
        label:"Clients"
    },
    {
        path:"/products",
        icon:<ShoppingBasket size={25} />,
        label:"Products"
    },
    {
        path:"/orders",
        icon:<Package size={25} />,
        label:"Orders"
    },
    {
        path:"/about",
        icon:<Info  size={25}/>,
        label:"About"
    },
    {
        path:"/settings",
        icon:<Settings  size={25}/>,
        label:"Settings"
    },
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-menu">
                {menuItems.map((item)=>(
                    <NavLink
                        key = {item.path}
                        to={item.path}
                        className={({isActive})=>isActive ? "nav-link active" : "nav-link"}>
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="user-panel">
                <div className="user-icon">
                    <User size={32} />
                </div>
                <div>
                    <p className="user-name">Youssef errachid</p>
                    <p className="user-role">ADMIN</p>
                </div>
            </div>
        </aside>
    )
}