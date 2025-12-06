import React from "react";
import Navbar from "./shared/Navbar"; // Import the Header component
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access the Redux store
import "./pricing.css";

const plans = [
    {
        type: "Basic",
        price: "Free",
        details: [
            "Browse jobs",
            "Create a basic resume",
            "Limited job applications",
            "Access to job alerts",
        ],
        theme: "light",
        icon: "fa-user",
    },
    {
        type: "Pro",
        price: "₹499",
        details: [
            "Browse jobs with priority",
            "Create a professional resume",
            "Unlimited job applications",
            "Priority support",
            "Resume feedback",
        ],
        theme: "dark",
        icon: "fa-briefcase",
    },
    {
        type: "Enterprise",
        price: "₹999",
        details: [
            "Everything in Pro plan",
            "Bulk job applications for candidates",
            "Access to advanced analytics",
            "Dedicated career advisor",
            "24/7 support",
        ],
        theme: "light",
        icon: "fa-building",
    },
];

const Pricing = () => {
    // Access the user state from the Redux store
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="pricing">
            <Navbar />
            <div className="pricing_container">
                <p className="contact">Contact <mail>contact@owlroles.com</mail></p>

                {/* Pricing Cards Section */}
                <div className="pricing_card-container">
                    
                    {plans.map((plan, index) => (
                        <div key={index} className="pricing_card-wrapper">
                            <div className={`pricing_card ${plan.theme}`}>
                                <div className="pricing_text-overlay">
                                    <h2>{plan.type}</h2>
                                    <div className="pricing_price">{plan.price}</div>
                                    <div className="pricing_details-text">
                                        {plan.details.map((detail, i) => (
                                            <span key={i}>{detail}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Conditionally render the Sign Up button */}
                                <div
                                    className={`pricing_purchase-button-container ${plan.theme === "dark" ? "dark_container" : ""
                                        }`}
                                >
                                    <h2 className="pricing_back-h2">{plan.type}</h2>
                                    <i className={`fa-solid ${plan.icon}`}></i>
                                
                                    {/* Only show Sign Up button if user is not logged in */}
                                    {!user && (
                                        <Link to="/signup">
                                            <div
                                                className={`pricing_purchase-button ${plan.theme
                                                    }`}
                                            >
                                                Sign Up
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
};

export default Pricing;
