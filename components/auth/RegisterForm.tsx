"use client";

import { register } from "@/lib/actions/auth";
import { signupRenderFields, SignupSchema } from "@/lib/schemas/auth";
import { FieldConfig, State } from "@/lib/schemas/base";
import { Class } from "@/lib/types/class";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import BaseForm from "../form/base-form";
import PasswordField from "../form/password-field";

interface RegisterFormProps {
  classes: Array<Class>;
}

const RegisterForm = ({ classes }: RegisterFormProps) => {
  const router = useRouter();
  const updatedSignupFields: FieldConfig[] = signupRenderFields.map((field) => {
    if (field.name === "password" || field.name === "confirmPassword") {
      return {
        ...field,
        customRender: (form: UseFormReturn, state: State) => (
          <PasswordField form={form} state={state} fieldConfig={field} />
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
      fields={updatedSignupFields}
      submitText="Sign Up"
      loadingText="Signing up..."
      onSuccess={() => {
        router.push("/");
      }}
    />
  );
};

export default RegisterForm;
