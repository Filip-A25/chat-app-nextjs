"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "@/app/authentication/components";
import { validation } from "@/app/authentication/const/authRequirements";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/shared";
import { paths } from "@/app/types";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<LoginData>();
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post("/api/authentication/login", data);
      router.push(paths.myChats);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <section className="h-[calc(100vh-65px)] pt-[65px] flex flex-col justify-center items-center">
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
          <Button title="Login" theme="primary" />
        </form>
      </FormProvider>
    </section>
  );
}
