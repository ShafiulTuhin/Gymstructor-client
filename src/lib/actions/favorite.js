"use server";

import { getHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getMyFavoriteClass = async (userId) => {
  const res = await fetch(`${baseUrl}/api/favorites/${userId}`, {
    headers: { ...(await getHeader()) },
  });
  return res.json();
};
