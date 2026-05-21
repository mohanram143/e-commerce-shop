// src/pages/AuthPage.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";

import {
  ToastContainer,
  toast,
  Bounce,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { auth } from "../firebase";
import { setUser } from "../store/slices/authSlice";

import Button from "../pages/Button";
import Saly from "../assets/Saly.svg";

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // SUCCESS LOGIN/SIGNUP
  const handleSuccess = (userCred) => {
    const user = userCred.user;

    dispatch(
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || name || "User",
        photoURL: user.photoURL || null,
      })
    );

    toast.success("Welcome Back 🎉", {
      position: "top-right",
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // EMAIL LOGIN / SIGNUP
  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      if (tab === "login") {
        const cred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        toast.success("Login Successful 🚀");

        handleSuccess(cred);
      } else {
        const cred =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        toast.success("Account Created 🎉");

        handleSuccess(cred);
      }
    } catch (err) {
      console.log(err);

      toast.error("Authentication Failed ❌");

      setError(
        err.message
          .replace("Firebase: ", "")
          .replace(/\(auth.*\)\.?/, "")
      );
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogle = async () => {
    setError("");

    try {
      toast.info("Opening Google Login...");

      const provider = new GoogleAuthProvider();

      const cred = await signInWithPopup(
        auth,
        provider
      );

      toast.success("Google Login Successful 🚀");

      handleSuccess(cred);
    } catch (err) {
      console.log(err);

      toast.error("Google Login Failed ❌");

      setError(
        err.message
          .replace("Firebase: ", "")
          .replace(/\(auth.*\)\.?/, "")
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 flex items-center justify-center p-4">

        {/* BLOBS */}
        <div className="fixed top-10 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-30 blur-2xl animate-pulse" />

        <div className="fixed bottom-10 right-10 w-48 h-48 bg-pink-400 rounded-full opacity-20 blur-3xl animate-pulse delay-700" />

        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex min-h-[560px]">

          {/* LEFT SIDE */}
          <div className="hidden md:flex w-5/12 bg-gradient-to-br from-orange-400 via-pink-500 to-rose-500 flex-col items-center justify-center p-8 relative overflow-hidden">

            <div className="relative z-10 mb-6">
              <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">

                <img
                  className="w-[420px] float-animation"
                  src={Saly}
                  alt="Saly"
                />

              </div>
            </div>

            <h2 className="text-white text-3xl font-bold text-center">
              {tab === "login"
                ? "Welcome Back!"
                : "Create Account"}
            </h2>

            <p className="text-white/75 text-sm text-center mt-3">
              {tab === "login"
                ? "Login to continue shopping"
                : "Create your account and explore"}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10">

            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Welcome{" "}
              <span className="text-orange-500">
                Buddy
              </span>
            </h1>

            <p className="text-gray-400 text-sm mb-6">
              Your E-Commerce Destination
            </p>

            {/* TABS */}
            <div className="flex bg-pink-50 rounded-2xl p-1 mb-6">

              {["login", "signup"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setError("");

                    toast.info(
                      t === "login"
                        ? "Login Mode"
                        : "Signup Mode"
                    );
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                    tab === t
                      ? "bg-white shadow-md text-orange-500"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}

            </div>

            {/* GOOGLE BUTTON */}
            <div
              onClick={handleGoogle}
              className="cursor-pointer mb-5 flex items-center justify-center"
            >
              <Button />
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 mb-5">

              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-gray-400 text-xs uppercase">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-200" />

            </div>

            {/* NAME */}
            {tab === "signup" && (
              <div className="mb-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

              </div>
            )}

            {/* EMAIL */}
            <div className="mb-4">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />

            </div>

            {/* PASSWORD */}
            <div className="relative mb-4">

              <input
                type={
                  showPass
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPass(!showPass)
                }
                className="absolute right-4 top-3 text-pink-500"
              >
                {showPass ? (
                  <LuEyeClosed />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-xs mb-3 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* SWITCH */}
            <p className="text-xs text-gray-400 mb-4">

              {tab === "login" ? (
                <>
                  Don't have an account?{" "}

                  <button
                    onClick={() =>
                      setTab("signup")
                    }
                    className="text-orange-500 font-semibold"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}

                  <button
                    onClick={() =>
                      setTab("login")
                    }
                    className="text-orange-500 font-semibold"
                  >
                    Login
                  </button>
                </>
              )}

            </p>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl py-3.5 font-bold tracking-widest uppercase shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60"
            >
              {loading
                ? "Loading..."
                : tab === "login"
                ? "LOGIN"
                : "SIGN UP"}
            </button>

          </div>
        </div>
      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
    </>
  );
}