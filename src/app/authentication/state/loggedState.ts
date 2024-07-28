"use client";

import {atom} from "recoil";

export const loggedState = atom({
    key: "authentication.isLoggedIn",
    default: false
})