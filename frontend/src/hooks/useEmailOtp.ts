import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateUser } from "@/components/redux/common/commonSlice";
import { authService } from "@/services/auth.service";
import { useAppDispatch } from "@/stores/hooks";
import type { EmailStep } from "@/types/emailStep.types";

export const useEmailOtp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [emailStep, setEmailStep] = useState<EmailStep>("input");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      await authService.sendCode(email);
      setEmailStep("code");
    } catch {
      setError("Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return;

    setIsLoading(true);
    setError(null);

    try {
      await authService.verifyCode(email, code);
      const userData = await authService.getCurrentUser();
      dispatch(updateUser(userData));
      navigate("/dashboard");
    } catch {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setEmailStep("input");
    setCode("");
    setError(null);
  };

  return {
    emailStep,
    email,
    code,
    isLoading,
    error,
    setEmail,
    setCode,
    handleSendCode,
    handleVerifyCode,
    reset,
  };
};
