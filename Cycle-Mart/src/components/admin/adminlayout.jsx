import React from "react";
import { Outlet } from "react-router-dom";
//import AdminNav from "./AdminNav";

const AdminLayout = () => {
    return (
        <div>
            <AdminNav />
            <div className="container mt-4">
                <Outlet />  {/* Admin pages will appear here */}
            </div>
        </div>
    );
};

export default AdminLayout;
