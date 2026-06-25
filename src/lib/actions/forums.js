"use server";

import { getHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createForum = async (newForumData) => {
  const res = await fetch(`${baseUrl}/api/forums`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(await getHeader()),
    },
    body: JSON.stringify(newForumData),
  });

  const data = await res.json();
  return data;
};

// Get all Forums
export const getAllForums = async () => {
  const res = await fetch(`${baseUrl}/api/forums`);
  return res.json();
};
// Get all forums for admin:
export const getAdminForums = async () => {
  const res = await fetch(`${baseUrl}/api/admin/forums`, {
    headers: { ...(await getHeader()) },
  });
  return res.json();
};

// Get author's all forums
export const getAuthorForums = async (authorId) => {
  const res = await fetch(`${baseUrl}/api/forums/author/${authorId}`, {
    headers: { ...(await getHeader()) },
  });
  return res.json();
};

// Get Single forum details
export const getSingleForum = async (id) => {
  const res = await fetch(`${baseUrl}/api/forums/single/${id}`, {
    headers: { ...(await getHeader()) },
  });
  const myForum = await res.json();
  return myForum;
};
// Update Forum
export const updateForum = async (id, updatedForum) => {
  const res = await fetch(`${baseUrl}/api/forums/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeader()),
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
      ...(await getHeader()),
    },
  });

  return await res.json(); // ✅ call the function
};
// Create comments
export const createComment = async (forumId, user, text) => {
  try {
    const res = await fetch(`${baseUrl}/api/forums/${forumId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await getHeader()) },
      body: JSON.stringify({
        userId: user.id,
        userName: user.name,
        text,
      }),
    });

    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};
// Edit comment
export const editComment = async (forumId, commentId, userId, text) => {
  const res = await fetch(
    `${baseUrl}/api/forums/${forumId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(await getHeader()),
      },
      body: JSON.stringify({
        userId,
        text,
      }),
    },
  );

  return res.json();
};
// Delete comment
export const deleteComment = async (forumId, commentId, userId) => {
  const res = await fetch(
    `${baseUrl}/api/forums/${forumId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(await getHeader()),
      },
      body: JSON.stringify({
        userId,
      }),
    },
  );

  return await res.json();
};
