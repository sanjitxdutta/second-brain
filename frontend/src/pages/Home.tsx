import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SignupModal from "../components/SignupModal";
import SigninModal from "../components/SigninModal";
import { authApi } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const rotatingMessages = [
    "Your notes, everywhere",
    "Capture ideas instantly",
    "Organize without effort",
    "Access from anywhere",
    "Your brain, upgraded"
];

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const [messageIndex, setMessageIndex] = useState(0);
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSignup = async (formData: { name: string; email: string; password: string }) => {
        try {
            const { token } = await authApi.signup(formData.name, formData.email, formData.password);
            setToken(token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Signup failed:", err);
        }
    };

    const handleSignin = async (formData: { email: string; password: string }) => {
        try {
            const { token } = await authApi.signin(formData.email, formData.password);
            setToken(token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Signin failed:", err);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-6"
            style={{
                backgroundImage: "url('/background_img.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >

            <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">

                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow mb-4">
                            Welcome to Second Brain
                        </h1>
                        <p className="text-gray-800 mb-6 leading-relaxed font-medium drop-shadow">
                            Capture ideas, links and notes — instantly. Organize them your way and access them anywhere.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                            <div className="w-full sm:w-auto">
                                <Button
                                    variant="primary"
                                    size="md"
                                    text="Create account"
                                    startIcon={<FaUserPlus />}
                                    onClick={() => setShowSignup(true)}
                                />
                            </div>

                            <div className="w-full sm:w-auto">
                                <Button
                                    variant="secondary"
                                    size="md"
                                    text="Sign in"
                                    startIcon={<FaSignInAlt />}
                                    onClick={() => setShowSignin(true)}
                                />
                            </div>
                        </div>

                        <p className="text-sm text-gray-700 mt-6">
                            Already have an account? Tap{" "}
                            <span className="font-semibold">Sign in</span> to go straight to your dashboard.
                        </p>
                    </div>

                    <div className="hidden md:flex md:flex-1 items-center justify-center">
                        <div className="w-64 h-40 rounded-lg bg-white/40 backdrop-blur-lg border border-white/30 flex items-center justify-center text-center px-4 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={messageIndex}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="text-purple-500 font-semibold text-lg"
                                >
                                    {rotatingMessages[messageIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <SignupModal
                isOpen={showSignup}
                onClose={() => setShowSignup(false)}
                onSwitchToLogin={() => {
                    setShowSignup(false);
                    setShowSignin(true);
                }}
                onSubmit={handleSignup}
            />

            <SigninModal
                isOpen={showSignin}
                onClose={() => setShowSignin(false)}
                onSwitchToSignup={() => {
                    setShowSignin(false);
                    setShowSignup(true);
                }}
                onSubmit={handleSignin}
            />
        </div>
    );
};

export default Home;
