"use client";

import {atom} from "recoil";
import {UserTokenData} from "@/app/(modules)/authentication/types";

export const userDataState = atom<UserTokenData>({
    key: "authentication.userDataState",
    default: undefined
})

export const loggedState = atom({
    key: "authentication.isLoggedIn",
    default: false
})