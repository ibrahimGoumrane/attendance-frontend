"use client";

import { login } from "@/lib/actions/auth";
import { loginRenderFields, LoginSchema } from "@/lib/schemas/auth"; // assuming you have a login schema
import { FieldConfig, State } from "@/lib/schemas/base";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import BaseForm from "../form/base-form";
import PasswordField from "../form/password-field";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const updatedLoginFields: FieldConfig[] = loginRenderFields.map((field) => {
    if (field.name === "password") {
      return {
        ...field,
        type: showPassword ? "text" : "password",
        customRender: (form: UseFormReturn, state: State) => (
          <PasswordField
            form={form}
            state={state}
            showPassword={showPassword}
            fieldConfig={field}
            handlePasswordVisibility={togglePasswordVisibility}
          />
        ),
      };
    }
    return field;
  });

  return (
    <BaseForm
      initialState={{ success: false, errors: {} }}
      action={login}
      schema={LoginSchema}
      fields={updatedLoginFields}
      submitText="Sign In"
      loadingText="Signing in..."
      onSuccess={() => {
        router.push("/");
      }}
    />
  );
};

export default LoginForm;
