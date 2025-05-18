"use client";

import { login } from "@/lib/actions/auth";
import { loginRenderFields, LoginSchema } from "@/lib/schemas/auth"; // assuming you have a login schema
import { FieldConfig, State } from "@/lib/schemas/base";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import BaseForm from "../form/base-form";
import PasswordField from "../form/password-field";

const LoginForm = () => {
  const router = useRouter();

  const updatedLoginFields: FieldConfig[] = loginRenderFields.map((field) => {
    if (field.name === "password") {
      return {
        ...field,
        customRender: (form: UseFormReturn, state: State) => (
          <PasswordField
            form={form}
            state={state}
            fieldConfig={field}
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
