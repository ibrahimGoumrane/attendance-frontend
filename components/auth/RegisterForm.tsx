"use client";

import { Class } from "@/lib/types/class";
import BaseForm from "../form/base-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldConfig, State } from "@/lib/schemas/base";
import { signupRenderFields, SignupSchema } from "@/lib/schemas/auth";
import PasswordField from "../form/password-field";
import { UseFormReturn } from "react-hook-form";
import { register } from "@/lib/actions/auth";

interface RegisterFormProps {
  classes: Array<Class>;
}

const RegisterForm = ({ classes }: RegisterFormProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const updatedSignupSchema: FieldConfig[] = signupRenderFields.map((field) => {
    if (field.name === "password" || field.name === "confirmPassword") {
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
    if (field.type === "select") {
      return {
        ...field,
        options: [
          { value: "None", label: "Choose a class" },
          ...classes.map((classItem) => ({
            value: classItem.id,
            label: classItem.name,
          })),
        ],
      };
    }
    return field;
  });
  return (
    <BaseForm
      initialState={{ success: false, errors: {} }}
      action={register}
      schema={SignupSchema}
      fields={updatedSignupSchema}
      submitText="Sign Up"
      loadingText="Signing up..."
      onSuccess={() => {
        router.push("/dashboard");
      }}
    />
  );
};

export default RegisterForm;
