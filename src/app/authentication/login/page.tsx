"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "@/app/authentication/components";
import { validation } from "@/app/authentication/const/authRequirements";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<LoginData>();

  const onSubmit = () => {};

  return (
    <section>
      <FormProvider {...form}>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <h1>Sign in</h1>
          <InputField
            label="E-mail"
            name="email"
            type="email"
            placeholder="Enter your e-mail address..."
            validation={validation.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password..."
            validation={validation.email}
          />
        </form>
      </FormProvider>
    </section>
  );
}
