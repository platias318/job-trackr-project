import { useEmailOtp } from "@/hooks/useEmailOtp";

import { EmailCodeStep } from "./EmailCodeStep";
import { EmailInputStep } from "./EmailInputStep";

export const EmailOtpForm = () => {
  const otp = useEmailOtp();

  if (otp.emailStep === "input") {
    return (
      <EmailInputStep
        email={otp.email}
        isLoading={otp.isLoading}
        error={otp.error}
        setEmail={otp.setEmail}
        onSubmit={otp.handleSendCode}
      />
    );
  }

  return (
    <EmailCodeStep
      email={otp.email}
      code={otp.code}
      isLoading={otp.isLoading}
      error={otp.error}
      setCode={otp.setCode}
      onSubmit={otp.handleVerifyCode}
      onReset={otp.reset}
    />
  );
};
