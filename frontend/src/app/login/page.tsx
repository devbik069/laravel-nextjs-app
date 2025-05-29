"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/components/AuthContext";
import { toast } from "react-hot-toast";
import ErrorAlert from "@/components/ErrorAlert";

export default function Login() {
  const { isAuthenticated, refreshAuth, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");

    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/api/v1/login", { email, password });

      await refreshAuth();
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 422) {
        const messages = Object.values(err.response.data.errors).flat();
        setErrors(messages);
      } else {
        setErrors([err.response?.data?.message || "Login Failed"]);
      }
    }
  };

  if (loading || isAuthenticated) return null;

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Login</h1>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {errors.length > 0 && (
                  <ErrorAlert errors={errors} onClose={() => setErrors([])} />
                )}
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
