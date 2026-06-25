import Login from "@/components/authentication/Login";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const LoginPage = async () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
