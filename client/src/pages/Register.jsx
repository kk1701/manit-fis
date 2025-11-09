import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/http";   // make sure this exists

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    empId: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api("/auth/register", {
        method: "POST",
        body: form,
      });

      if (res?.id) {
        navigate("/login");
      } else {
        setError(res.message || "Registration failed. Try again.");
      }
    } catch {
      setError("Server error. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-200">

        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          Register as Faculty
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Create your faculty account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">Full Name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-0"
              placeholder="Dr. John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">Employee ID</label>
            <input
              name="empId"
              type="text"
              required
              value={form.empId}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-0"
              placeholder="MANIT1234"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-0"
              placeholder="professor@college.edu"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-900 focus:ring-0"
              placeholder="********"
            />
          </div>

          {error && <div className="text-sm text-red-600 font-medium">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 text-white py-2.5 font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-900 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
