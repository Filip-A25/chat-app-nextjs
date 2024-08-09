"use client";

import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/app/authentication/components";
import { validation } from "@/app/authentication/const/authRequirements";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/shared";
import { paths } from "@/app/types";
import { notifyCreateAccount, notifyErrorMessage } from "@/app/utils";

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
      notifyCreateAccount();
      router.push(paths.login);
    } catch (error: any) {
      notifyErrorMessage(error.message);
      throw new Error(error);
    }
  };

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <FormProvider {...form}>
        <form
          id="register-form"
          className="flex flex-col px-20"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl md:text-4xl font-[600]">Sign up now!</h1>
          <div className="py-6">
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
          </div>
          <Button title="Sign up" theme="primary" />
        </form>
      </FormProvider>
    </section>
  );
}
