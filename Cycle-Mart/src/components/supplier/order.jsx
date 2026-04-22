import React, { useEffect, useState } from "react";

const SupOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Sample order data
        setOrders([
            { order_id: "O001", address_id: "A101", status: "Pending", sub_total: "₹15000", shipping: "₹500", payment_status: "Paid", created_at: "2025-09-12" },
            { order_id: "O002", address_id: "A102", status: "Shipped", sub_total: "₹12000", shipping: "₹300", payment_status: "Paid", created_at: "2025-09-11" },
            { order_id: "O003", address_id: "A103", status: "Pending", sub_total: "₹8000", shipping: "₹200", payment_status: "Unpaid", created_at: "2025-09-10" },
        ]);
    }, []);

    return (
        <div className="container-fluid bg-light min-vh-100">
            <div className="container mt-4">
                <h2 className="mb-4 text-center">📦 ORDERS</h2>

                <div className="card shadow-sm p-4">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped text-center">
                            <thead className="table-primary">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Address ID</th>
                                    <th>Status</th>
                                    <th>Sub Total</th>
                                    <th>Shipping</th>
                                    <th>Payment Status</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.order_id}</td>
                                        <td>{order.address_id}</td>
                                        <td>{order.status}</td>
                                        <td>{order.sub_total}</td>
                                        <td>{order.shipping}</td>
                                        <td>{order.payment_status}</td>
                                        <td>{order.created_at}</td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">No orders available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupOrders;
