"use client";

import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/app/authentication/components";
import { validation } from "@/app/authentication/const/authRequirements";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/shared";
import { paths } from "@/app/types";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const form = useForm<RegisterData>();
  const router = useRouter();

  const onSubmit = async (data: RegisterData) => {
    try {
      await axios.post("/api/authentication/register", data);
      router.push(paths.login);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <section className="h-[calc(100vh-65px)] pt-[65px] flex flex-col justify-center items-center">
      <FormProvider {...form}>
        <form
          id="register-form"
          className="flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1>Sign up now!</h1>
          <InputField
            label="Username"
            name="username"
            type="text"
            placeholder="Enter a username..."
            validation={validation.username}
          />
          <InputField
            label="E-mail"
            name="email"
            type="email"
            placeholder="Enter your email address..."
            validation={validation.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter a password..."
            validation={validation.password}
          />
          <Button title="Sign up" theme="primary" />
        </form>
      </FormProvider>
    </section>
  );
}
