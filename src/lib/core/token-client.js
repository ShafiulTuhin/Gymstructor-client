import { authClient } from "../auth-client";

export const getUserToken = async () => {
  const session = await authClient.getSession();
  // console.log(session);

  return session?.data?.session?.token;
};
