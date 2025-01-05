import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import logos from '../assets/google.png';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported for styling

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to handle Google login
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      if (result) {
        toast.success("User Logged in Successfully", { position: "top-center" });
        setUser(result.user);
        navigate("/dashboard");
      } else {
        toast.error("Login Failed!", { position: "top-center" });
      }
    }).catch((error) => {
      toast.error("An error occurred during login", { position: "top-center" });
      console.error("Login error:", error);
    });
  }

  // Function to handle log out
  function googleLogout() {
    signOut(auth).then(() => {
      toast.success("User Logged Out Successfully", { position: "top-center" });
      setUser(null); // Update the state when the user logs out
      navigate("/login");
    }).catch((error) => {
      toast.error("An error occurred during logout", { position: "top-center" });
      console.error("Logout error:", error);
    });
  }

  // Listen for authentication state changes (log in or log out)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user state whenever the auth state changes
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        // If the user is logged in, show the logout button
        <button
          onClick={googleLogout}
          className="w-full py-3 px-6 flex items-center justify-center bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
        >
          Log Out
        </button>
      ) : (
        // If the user is not logged in, show the sign-in button
        <button
          onClick={googleLogin}
          className="w-full py-3 px-6 flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          <img
            src={logos}
            alt="Google"
            className="w-6 h-6 mr-3 bg-white rounded-full"
          />
          Continue with Google
        </button>
      )}

      {/* ToastContainer added here */}
      <ToastContainer />
    </div>
  );
};

export default Login;
