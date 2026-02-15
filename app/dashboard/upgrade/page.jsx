"use client";
import { useState } from "react";
import axios from "axios";
export default function Upgrade() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare the data
        const data = {
            name,
            amount,
            mobile,
            transactionId: "T" + Date.now(),
            MUID: "MUID" + Date.now()
        };

        try {
            // Initiate payment
            const response = await axios.post("http://localhost:3000/api/order", data);

            //   Redirect user to PhonePe payment page given by phonepay
            if (
                response.data &&
                response.data.data.instrumentResponse.redirectInfo.url
            ) {
                window.location.href =
                    response.data.data.instrumentResponse.redirectInfo.url;
            } else {
                console.log("Not Redirecting")
            }
        } catch (err) {
            console.error(err);
            alert("Error initiating payment. Please try again.");
        } finally {
            console.log("Finaly")
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-50 to-green-500">
            <div className="max-w-4xl p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    PhonePe Payment Gateway
                </h2>
                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label>Mobile:</label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}