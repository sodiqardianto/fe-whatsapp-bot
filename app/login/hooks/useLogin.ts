"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { LoginFormData } from "@/lib/validations/auth";
import { UseFormReturn } from "react-hook-form";

export function useLogin(form: UseFormReturn<LoginFormData>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", data);
      const { user, token } = response.data;

      if (response.status === 200) {
        toast.success("Login successful!");

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        const from = searchParams.get("from") || "/";
        router.push(from);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          form.setError(key as keyof LoginFormData, {
            type: "server",
            message: errors[key],
          });
        });
      }

      form.setValue("password", "");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
}
