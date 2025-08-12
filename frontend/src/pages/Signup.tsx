import { useState } from "react";
import SigninModal from "../components/SigninModal";
import SignupModal from "../components/SignupModal";

export default function SignupPage() {
    const [isSignupOpen, setIsSignupOpen] = useState(true);
    const [isSigninOpen, setIsSigninOpen] = useState(false);

    const handleSignin = (formData: { email: string; password: string }) => {
        console.log("Sign in data:", formData);
        // TODO: Add your backend call here
    };

    const handleSignup = (formData: { name: string; email: string; password: string }) => {
        console.log("Sign up data:", formData);
        // TODO: Add your backend call here
    };

    return (
        <div>
            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onSwitchToSignin={() => {
                    setIsSignupOpen(false);
                    setIsSigninOpen(true);
                }}
                onSubmit={handleSignup}
            />

            <SigninModal
                isOpen={isSigninOpen}
                onClose={() => setIsSigninOpen(false)}
                onSwitchToSignup={() => {
                    setIsSigninOpen(false);
                    setIsSignupOpen(true);
                }}
                onSubmit={handleSignin}
            />
        </div>
    );
}
