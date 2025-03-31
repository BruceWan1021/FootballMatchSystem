import React, { useState } from "react";
import RegisterForm from "../components/registerForm";
import EmailVerificationForm from "../components/emailVerifyForm";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div>
      {step === 1 && <RegisterForm setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <EmailVerificationForm email={email} />}
    </div>
  );
};

export default RegisterPage;
