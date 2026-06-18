"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createClass = async (newClassData) => {
  const res = await fetch(`${baseUrl}/api/classes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newClassData),
  });

  const data = await res.json();
  return data;
};
