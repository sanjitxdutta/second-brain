import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "./Card";
import { shareApi } from "../api/shareApi";
import { Button } from "./Button";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

interface Note {
  _id: string;
  type: string;
  title: string;
  link: string;
  tags?: string;
  createdAt: string;
}

interface PublicNotesSectionProps {
  selected: string;
}

const PublicNotesSection: React.FC<PublicNotesSectionProps> = ({ selected }) => {
  const { shareId } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [username, setUsername] = useState("");
  const { token, setToken } = useAuth();

  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupErrors, setSignupErrors] = useState<{ field: string; message: string }[]>([]);

  useEffect(() => {
    if (shareId) {
      shareApi
        .fetchSharedBrain(shareId)
        .then((data) => {
          if (data?.content && Array.isArray(data.content)) {
            setNotes(data.content);
            setUsername(data.username || "Unknown User");
          } else {
            setNotes([]);
            setUsername("");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch shared brain:", err);
          setNotes([]);
          setUsername("");
        });
    }
  }, [shareId]);

  const filteredNotes = selected
    ? notes.filter((note) => note.type?.toLowerCase() === selected.toLowerCase())
    : notes;

  const handleSignin = async (formData: { email: string; password: string }) => {
    try {
      const { token } = await authApi.signin(formData.email, formData.password);
      setToken(token);
      toast.success("Signed in successfully!");
      return true;
    } catch (err: any) {
      console.error("Signin failed:", err);
      toast.error("Invalid email or password");
      return false;
    }
  };

  const handleSignup = async (formData: { name: string; email: string; password: string }) => {
    try {
      const { token } = await authApi.signup(formData.name, formData.email, formData.password);
      setToken(token);
      toast.success("Account created successfully!");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setSignupErrors(err.response.data.errors);
        toast.error("Please fix the highlighted errors.");
      } else if (err.response?.data?.message) {
        setSignupErrors([{ field: "general", message: err.response.data.message }]);
        toast.error(err.response.data.message);
      } else {
        setSignupErrors([{ field: "general", message: "Something went wrong" }]);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="px-4 md:px-8 py-4">

      <div className="md:hidden mb-4">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <img src="/logo.png" alt="Second Brain Logo" className="w-6 h-6" />
          <span className="text-xl font-bold text-gray-800 group-hover:text-purple-500 transition-colors">
            Second Brain
          </span>
        </Link>

        <h2 className="text-lg font-bold mt-3">
          Shared Brain by <span className="text-purple-500">{username}</span>
        </h2>

        <div className="flex gap-3 mt-4 w-full">
          {token ? (
            <Button
              variant="primary"
              size="sm"
              text="Home"
              startIcon={<FaHome />}
              onClick={() => (window.location.href = "/dashboard")}
            />
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                text="Sign In"
                startIcon={<FaSignInAlt />}
                onClick={() => setIsSigninOpen(true)}
              />
              <Button
                variant="primary"
                size="sm"
                text="Create Account"
                startIcon={<FaUserPlus />}
                onClick={() => setIsSignupOpen(true)}
              />
            </>
          )}
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          Shared Brain by <span className="text-purple-500">{username}</span>
        </h2>

        <div className="flex gap-3 items-center">
          {token ? (
            <Link to="/dashboard">
              <Button variant="primary" size="md" text="Home" startIcon={<FaHome />} />
            </Link>
          ) : (
            <>
              <Button
                variant="secondary"
                size="md"
                text="Sign In"
                startIcon={<FaSignInAlt />}
                onClick={() => setIsSigninOpen(true)}
              />
              <Button
                variant="primary"
                size="md"
                text="Create Account"
                startIcon={<FaUserPlus />}
                onClick={() => setIsSignupOpen(true)}
              />
            </>
          )}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Card
              key={note._id}
              title={note.title}
              type={note.type}
              link={note.link}
              tags={note.tags ? note.tags.split(",").map((tag) => tag.trim()) : []}
              dateAdded={note.createdAt}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No notes found in this shared brain.
          </p>
        )}
      </div>

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
        errors={signupErrors}
        setErrors={setSignupErrors}
      />
    </div>
  );
};

export default PublicNotesSection;
