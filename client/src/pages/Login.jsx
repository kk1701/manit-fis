import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.token) {
        navigate("/dashboard");
      } else {
        setError(res.message || "Invalid login.");
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-200">

        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          Faculty Login
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Access your Faculty Profile Dashboard
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              placeholder="name@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-0"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-0"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 text-white py-2.5 font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-600">
          New here?{" "}
          <Link to="/register" className="text-slate-900 font-medium hover:underline">
            Register as Faculty
          </Link>
        </p>
      </div>
    </div>
  );
}
