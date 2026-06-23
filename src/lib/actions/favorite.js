"use server";

import { getHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getMyFavoriteClass = async (userId) => {
  const res = await fetch(`${baseUrl}/api/favorites/${userId}`, {
    headers: { ...(await getHeader()) },
  });
  return res.json();
};

// Delte favorite
export const removeFavorite = async (userId, classId) => {
  if (!userId || !classId) {
    throw new Error("Missing required parameters: userId and classId.");
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/favorites/${userId}/${classId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(await getHeader()),
        },
      },
    );

    // Get response text first to avoid crashing if it's HTML/Text
    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      // If it's not JSON, the backend crashed or returned a 404 HTML page
      console.error("Server raw response:", responseText);
      throw new Error(
        `Server returned non-JSON response (Status ${response.status}). Check server logs.`,
      );
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove item from favorites.");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Network error occurred.");
  }
};
