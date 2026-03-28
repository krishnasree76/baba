// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1] px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-serif text-center mb-6 text-baba-primary">
//           {isLogin ? "Welcome Back" : "Create Account"}
//         </h2>

//         <form className="flex flex-col gap-4">

//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <button
//             type="submit"
//             className="bg-baba-primary text-white py-3 rounded font-semibold hover:bg-baba-accent transition"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//           <span className="text-sm text-gray-500">OR</span>
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//         </div>

//         {/* Google Button */}
//         <button
//           className="flex items-center justify-center gap-3 border py-3 rounded w-full hover:bg-gray-50 transition"
//         >
//           <FcGoogle size={22} />
//           Continue with Google
//         </button>

//         {/* Switch */}
//         <p className="text-center text-sm mt-6">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-baba-accent ml-2 font-medium"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const url = isLogin
//       ? "http://127.0.0.1:8000/api/auth/login/"
//       : "http://127.0.0.1:8000/api/auth/register/";

//     const body = isLogin
//       ? {
//           email: email,
//           password: password,
//         }
//       : {
//           first_name: name,
//           email: email,
//           password: password,
//         };

//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(JSON.stringify(data));
//       return;
//     }

//     if (isLogin) {
//       localStorage.setItem("token", data.access);

//       alert("Login successful ✅");

//       // redirect example
//       window.location.href = "/";
//     } else {
//       alert("Account created successfully 🎉");
//       setIsLogin(true);
//     }

//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1] px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-serif text-center mb-6 text-baba-primary">
//           {isLogin ? "Welcome Back" : "Create Account"}
//         </h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <button
//             type="submit"
//             className="bg-baba-primary text-white py-3 rounded font-semibold hover:bg-baba-accent transition"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//           <span className="text-sm text-gray-500">OR</span>
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//         </div>

//         <button className="flex items-center justify-center gap-3 border py-3 rounded w-full hover:bg-gray-50 transition">
//           <FcGoogle size={22} />
//           Continue with Google
//         </button>

//         <p className="text-center text-sm mt-6">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}

//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-baba-accent ml-2 font-medium"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";

// export default function Auth() {
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(true);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const { setUser } = useShop();

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password || (!isLogin && !name)) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const url = isLogin
//         ? "http://127.0.0.1:8000/api/auth/login/"
//         : "http://127.0.0.1:8000/api/auth/register/";

//       const body = isLogin
//         ? {
//             email: email,
//             password: password,
//           }
//         : {
//             first_name: name,
//             email: email,
//             password: password,
//           };

//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Something went wrong");
//         setLoading(false);
//         return;
//       }

//       if (isLogin) {
//         localStorage.setItem("token", data.access);

//         alert("Login successful ✅");

//         navigate("/");
//       } else {
//         alert("Account created successfully 🎉");
//         setIsLogin(true);
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }

//     setLoading(false);
//   };
//   if (isLogin) {
//     localStorage.setItem("token", data.access);
    
//     // ✅ Update the global state immediately
//     setUser(data.user); 

//     alert("Login successful ✅");
//     navigate("/");
// }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1] px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
//       >

//         <h2 className="text-2xl font-serif text-center mb-6 text-baba-primary">
//           {isLogin ? "Welcome Back" : "Create Account"}
//         </h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-baba-primary text-white py-3 rounded font-semibold hover:bg-baba-accent transition"
//           >
//             {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
//           </button>

//         </form>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//           <span className="text-sm text-gray-500">OR</span>
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//         </div>

//         {/* Google Login (for later) */}
//         <button className="flex items-center justify-center gap-3 border py-3 rounded w-full hover:bg-gray-50 transition">
//           <FcGoogle size={22} />
//           Continue with Google
//         </button>

//         {/* Switch login/signup */}
//         <p className="text-center text-sm mt-6">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}

//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-baba-accent ml-2 font-medium"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>

//       </motion.div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import { useShop } from "../context/ShopContext";
// import { useGoogleLogin } from '@react-oauth/google';

// export default function Auth() {
//   const navigate = useNavigate();
//   const { setUser } = useShop();

//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Validation
//     if (!email || !password || (!isLogin && !name)) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const url = isLogin
//         ? "http://127.0.0.1:8000/api/auth/login/"
//         : "http://127.0.0.1:8000/api/auth/register/";

//       const body = isLogin
//         ? { email, password }
//         : { first_name: name, email, password };

//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       // 2. Error Handling
//       if (!res.ok) {
//         console.error("Auth Error:", data);
//         alert(data.error || "Authentication failed. Check your credentials.");
//         return; // loading is handled in finally
//       }

//       // 3. Success Handling
//       if (isLogin) {
//         localStorage.setItem("token", data.access);

//         // ✅ Update global state so Navbar reflects logged-in user
//         if (data.user) {
//           setUser(data.user);
//         }

//         alert("Login successful ✅");
//         navigate("/");
//       } else {
//         alert("Account created successfully 🎉 Please login.");
//         setIsLogin(true);
//         setName(""); 
//       }
//     } catch (err) {
//       console.error("Connection Error:", err);
//       alert("Server error. Please ensure your backend is running.");
//     } finally {
//       setLoading(false);
//     }

//     const googleLogin = useGoogleLogin({
//   onSuccess: async (tokenResponse) => {
//     setLoading(true);
//     try {
//       // Send the access_token from Google to your Django backend
//       const res = await fetch("http://127.0.0.1:8000/api/auth/google/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ access_token: tokenResponse.access_token }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem("token", data.access);
//         setUser(data.user);
//         navigate("/");
//       }
//     } catch (err) {
//       console.error("Google Login Failed", err);
//     } finally {
//       setLoading(false);
//     }
//   },
// });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1] px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-serif text-center mb-6 text-baba-primary">
//           {isLogin ? "Welcome Back" : "Create Account"}
//         </h2>

//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-baba-primary text-white py-3 rounded font-semibold hover:bg-baba-accent transition disabled:opacity-50"
//           >
//             {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//           <span className="text-sm text-gray-500">OR</span>
//           <div className="flex-grow h-[1px] bg-gray-200"></div>
//         </div>

//         <button 
//   onClick={() => googleLogin()}
//   className="flex items-center justify-center gap-3 border py-3 rounded w-full hover:bg-gray-50 transition"
// >
//   <FcGoogle size={22} />
//   Continue with Google
// </button>

//         <p className="text-center text-sm mt-6">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-baba-accent ml-2 font-medium hover:underline"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";
export default function Auth() {
  const navigate = useNavigate();
  const { setUser } = useShop();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 1. Move the Hook to the Top Level
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/google/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("token", data.access);
          setUser(data.user);
          toast.success("Login successful ✅");
          navigate("/");
        } else {
          toast.error(data.error || "Google Auth failed on server");
        }
      } catch (err) {
        console.error("Google Login Failed", err);
        toast.error("Server error during Google Login");
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google Login Failed ❌"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const url = isLogin
        ? "http://127.0.0.1:8000/api/auth/login/"
        : "http://127.0.0.1:8000/api/auth/register/";

      const body = isLogin
        ? { email, password }
        : { first_name: name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
  toast.error(data.error || "Authentication failed");
  return;
}

if (isLogin) {
  localStorage.setItem("token", data.access);
  if (data.user) setUser(data.user);

  toast.success("Login successful ✅"); // ✅ FIXED

  navigate("/");
} else {
  toast.success("Account created successfully 🎉");

  setIsLogin(true);
  setName("");
}
    } catch (err) {
      console.error("Connection Error:", err);
      toast.error("Server error. Please try again");
    } finally {
      setLoading(false);
    }
  };

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

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-baba-accent"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-baba-primary text-white py-3 rounded font-semibold hover:bg-baba-accent transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-grow h-[1px] bg-gray-200"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-grow h-[1px] bg-gray-200"></div>
        </div>

        {/* ✅ Now googleLogin is defined in the correct scope */}
        <button 
          type="button"
          onClick={() => googleLogin()}
          disabled={loading}
          className="flex items-center justify-center gap-3 border py-3 rounded w-full hover:bg-gray-50 transition disabled:opacity-50"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-baba-accent ml-2 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}