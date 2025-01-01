"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FlashSale() {
    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-01-10T23:59:59").getTime(); // Set your flash sale end date and time
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            return null;
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval
    }, []);

    return (
        <Link className="" href={`/products/flashSale`}>
            <div className="p-14 rounded-2xl shadow-md h-fit  bg-pink-800/75 text-white">
              
                {timeLeft ? (
                    <div className="text-center">
                        <p className="text-xl font-semibold mb-2">Flash Sale Ends In:</p>
                        <div className="flex justify-center gap-4 text-2xl font-bold">
                            <div>
                                <p>{timeLeft.days}</p>
                                <span className="text-sm">Days</span>
                            </div>
                            <div>
                                <p>{timeLeft.hours}</p>
                                <span className="text-sm">Hours</span>
                            </div>
                            <div>
                                <p>{timeLeft.minutes}</p>
                                <span className="text-sm">Minutes</span>
                            </div>
                            <div>
                                <p>{timeLeft.seconds}</p>
                                <span className="text-sm">Seconds</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-lg font-semibold text-red-500 mt-4">
                        Flash Sale Ended!
                    </p>
                )}
            </div>
        </Link>
    );
}
