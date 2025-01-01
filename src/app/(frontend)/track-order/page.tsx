export default function TrackOrder() {
    const orderDetails = {
        orderId: "123456789",
        status: "In Transit",
        estimatedDelivery: "Jan 3, 2025",
        trackingSteps: [
            { status: "Order Placed", date: "Dec 30, 2024" },
            { status: "Order Processed", date: "Dec 31, 2024" },
            { status: "Shipped", date: "Jan 1, 2025" },
            { status: "In Transit", date: "Jan 2, 2025" },
        ],
    };

    return (
        <div className="flex justify-center items-center text-center  p-4">
            <div className="w-full max-w-3xl bg-slate-500/15  shadow-md rounded-md p-6">
                <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
                <div className="mb-6">
                    <p className="">
                        <strong>Order ID:</strong> {orderDetails.orderId}
                    </p>
                    <p className="">
                        <strong>Status:</strong> {orderDetails.status}
                    </p>
                    <p className="">
                        <strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold  mb-2">Tracking Steps:</h2>
                    <ul className="space-y-3">
                        {orderDetails.trackingSteps.map((step, index) => (
                            <li key={index} className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                                <div>
                                    <p className="font-medium">{step.status}</p>
                                    <p className=" text-sm">{step.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
