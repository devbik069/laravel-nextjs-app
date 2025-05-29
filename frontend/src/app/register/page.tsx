"use client";

import { useState } from "react";
import { register } from "@/lib/api";
import { useAuth } from "@/components/AuthContext";
import { toast } from "react-hot-toast";
import ErrorAlert from "@/components/ErrorAlert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { loading, refreshAuth } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      await refreshAuth();
      toast.success("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (err: any) {
      if (err.response?.status === 422) {
        const messages = Object.values(err.response.data.errors).flat();
        setErrors(messages);
      } else {
        setErrors([err.response?.data?.message || "Something went wrong"]);
      }
    }
  };

  if (loading) return null;

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Register</h1>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label htmlFor="passwordConfirmation" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="passwordConfirmation"
                    type="password"
                    className="form-control"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                </div>

                {errors.length > 0 && (
                  <ErrorAlert errors={errors} onClose={() => setErrors([])} />
                )}

                <button type="submit" className="btn btn-success w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
