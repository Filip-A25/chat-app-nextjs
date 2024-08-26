"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "@/shared";
import { validation } from "@/app/(modules)/authentication/const/authRequirements";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/shared";
import { paths } from "@/app/types";
import { notifyLoggedIn, notifyErrorMessage } from "@/app/utils";
import { loggedState } from "@/app/(modules)/authentication/state";
import { useSetRecoilState } from "recoil";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<LoginData>();
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(loggedState);

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post("/api/authentication/login", data);
      if (!response.data.user) return notifyErrorMessage(response.data.message);
      setIsLoggedIn(true);
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
              validation={validation.password}
            />
          </div>
          <Button title="Login" theme="primary" />
        </form>
      </FormProvider>
    </section>
  );
}
