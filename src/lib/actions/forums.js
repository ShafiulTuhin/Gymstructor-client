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

// Get Single forum details
export const getSingleForum = async (id) => {
  const res = await fetch(`${baseUrl}/api/forums/single/${id}`);
  const myForum = await res.json();
  return myForum;
};
// Update Forum
export const updateForum = async (id, updatedForum) => {
  const res = await fetch(`${baseUrl}/api/forums/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedForum),
  });

  return res.json();
};

// Delete forum post:
export const deleteForum = async (id) => {
  const res = await fetch(`${baseUrl}/api/forums/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  return res.json;
};
