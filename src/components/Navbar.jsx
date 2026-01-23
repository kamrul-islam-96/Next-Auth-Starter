import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="border-b-2 py-4 text-center space-x-3">
      <Link href="/">Home</Link>
      <Link href="/publicpage">Public</Link>
      <Link href="/private">Private</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
