import { authClient } from "./auth-client";

export const handleGoogleLogin = async () => {
  try {
    const result = await authClient.signIn.social({
      provider: "google",
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
