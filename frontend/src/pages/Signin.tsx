import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SigninModal from "../components/SigninModal";
import SignupModal from "../components/SignupModal";
import { authApi } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

export default function SigninPage() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [isSigninOpen, setIsSigninOpen] = useState(true);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSignin = async (formData: { email: string; password: string }) => {
    try {
      const { token } = await authApi.signin(formData.email, formData.password);
      setToken(token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signin failed:", err);
    }
  };

  const handleSignup = async (formData: { name: string; email: string; password: string }) => {
    try {
      const { token } = await authApi.signup(formData.name, formData.email, formData.password);
      setToken(token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div>
      <SigninModal
        isOpen={isSigninOpen}
        onClose={() => setIsSigninOpen(false)}
        onSwitchToSignup={() => {
          setIsSigninOpen(false);
          setIsSignupOpen(true);
        }}
        onSubmit={handleSignin}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsSigninOpen(true);
        }}
        onSubmit={handleSignup}
      />
    </div>
  );
}
