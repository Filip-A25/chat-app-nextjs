"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "@/app/authentication/components";
import { validation } from "@/app/authentication/const/authRequirements";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/shared";
import { paths } from "@/app/types";
import { notifyLoggedIn, notifyErrorMessage } from "@/app/utils/utils";

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
      notifyLoggedIn();
      router.push(paths.myChats);
    } catch (error: any) {
      notifyErrorMessage(error.message);
      throw new Error(error);
    }
  };

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <FormProvider {...form}>
        <form
          id="login-form"
          className="flex flex-col px-20"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl md:text-4xl font-[600]">Sign in</h1>
          <div className="py-6">
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
          </div>
          <Button title="Login" theme="primary" />
        </form>
      </FormProvider>
    </section>
  );
}
