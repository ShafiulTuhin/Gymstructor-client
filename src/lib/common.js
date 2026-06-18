import { authClient } from "./auth-client";

export const handleGoogleLogin = async () => {
  try {
    console.log("Button clicked");

    const result = await authClient.signIn.social({
      provider: "google",
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
