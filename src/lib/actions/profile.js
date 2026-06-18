"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createProfile = async (newProfileData) => {
  const res = await fetch(`${baseUrl}/api/profile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newProfileData),
  });

  const data = await res.json();
  return data;
};
