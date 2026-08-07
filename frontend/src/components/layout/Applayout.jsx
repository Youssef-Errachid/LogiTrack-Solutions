import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

import {Outlet} from 'react-router-dom';
import "../../styles/Applayout.css";

export default function Applayout() {
    return (
        <div>
            <Navbar />
            <div>
                <Sidebar/>
                <main className="main-content">
                    <Outlet/>
                </main>

            </div>
        </div>
    )

}