"use client";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userDataState } from "@/app/(modules)/authentication/state";
import { Button, ReturnButton } from "@/shared";
import { ResetForm, DataElement } from "../components";

export default function MyProfile({ params }: any) {
  const user = useRecoilValue(userDataState);
  const [formType, setFormType] = useState<
    "changeUsername" | "resetPassword"
  >();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleChangeUsername = () => {
    setFormType("changeUsername");
    setIsFormOpen(true);
  };

  const handleChangePassword = () => {
    setFormType("resetPassword");
    setIsFormOpen(true);
  };

  return (
    <section className="w-full flex flex-col items-center pt-32">
      {!isFormOpen && (
        <>
          <div className="w-28 h-28 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-main-red to-main-orange"></div>
          <ul className="py-6 flex flex-col items-center text-sm sm:text-md md:text-lg">
            <DataElement label="User ID" data={params.id} />
            <DataElement label="Username" data={user.username} />
            <DataElement label="Email" data={user.email} />
          </ul>
          <div className="flex flex-col">
            <Button
              title="Change username"
              theme="secondary"
              handleClick={handleChangeUsername}
            />
            <Button
              title="Reset password"
              theme="secondary"
              handleClick={handleChangePassword}
            />
          </div>
        </>
      )}
      {isFormOpen && formType && (
        <ResetForm
          user={user}
          setIsFormOpen={setIsFormOpen}
          formType={formType}
        />
      )}
    </section>
  );
}
