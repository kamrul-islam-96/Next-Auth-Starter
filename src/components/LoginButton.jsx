"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <div>
      <button className="btn" onClick={() => signIn()}>
        Login Now
      </button>
    </div>
  );
}
