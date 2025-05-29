"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/api";
import { useAuth } from "@/components/AuthContext";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error("User fetch failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      await refreshAuth();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading user info...</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title mb-4">Dashboard</h1>

              {user ? (
                <>
                  <p className="lead">
                    Welcome back, <strong>{user.name}</strong>!
                  </p>
                  <p>Email: {user.email}</p>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <p className="text-danger">Failed to load user info.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
