import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function useAuth() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("token", { path: "/" });

    // Show success message
    toast.success("Logged out successfully");

    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to login page
    router.push("/login");
  };

  const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  };

  useEffect(() => {
    // Check authentication on mount
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return {
    logout,
    isAuthenticated,
  };
}
