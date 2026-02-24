import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1] px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-serif text-center mb-6 text-baba-primary">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form className="flex flex-col gap-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
          />

          <button
            type="submit"
            className="bg-baba-primary text-white py-3 rounded font-semibold hover:bg-baba-accent transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-grow h-[1px] bg-gray-200"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-grow h-[1px] bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          className="flex items-center justify-center gap-3 border py-3 rounded w-full hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Switch */}
        <p className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-baba-accent ml-2 font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}