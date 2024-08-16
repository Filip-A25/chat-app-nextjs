"use client";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userDataState } from "@/app/authentication/state";
import { Button } from "@/shared";
import { ResetForm, DataElement } from "../components";

export default function MyProfile({ params }: any) {
  const user = useRecoilValue(userDataState);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="w-full flex flex-col items-center pt-32">
      {!isFormOpen ? (
        <>
          <div className="w-28 h-28 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-main-red to-main-orange"></div>
          <ul className="py-6 flex flex-col items-center text-sm sm:text-md md:text-lg">
            <DataElement label="User ID" data={params.id} />
            <DataElement label="Username" data={user.username} />
            <DataElement label="Email" data={user.email} />
          </ul>
          <Button
            title="Reset password"
            theme="secondary"
            handleClick={() => setIsFormOpen(true)}
          />
        </>
      ) : (
        <ResetForm user={user} setIsFormOpen={setIsFormOpen} />
      )}
    </section>
  );
}
