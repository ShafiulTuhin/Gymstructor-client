"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createForum = async (newFOrumData) => {
  const res = await fetch(`${baseUrl}/api/forums`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newFOrumData),
  });

  const data = await res.json();
  return data;
};

// Get author all forums
export const getAuthorForums = async (authorId) => {
  const res = await fetch(`${baseUrl}/api/forums/author/${authorId}`);
  return res.json();
};
