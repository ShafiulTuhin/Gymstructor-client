"use server";

import { getHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createClass = async (newClassData) => {
  const res = await fetch(`${baseUrl}/api/classes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(await getHeader()),
    },
    body: JSON.stringify(newClassData),
  });

  const data = await res.json();
  return data;
};

export const getAllClasses = async () => {
  const res = await fetch(`${baseUrl}/api/classes?status=approved`);
  return res.json();
};
// Get admin classes
export const getAdminClasses = async () => {
  const res = await fetch(`${baseUrl}/api/admin/classes`, {
    cache: "no-store",

    headers: { ...(await getHeader()) },
  });
  return res.json();
};

// Get trainer all Classes
export const getTrainerClasses = async (trainerId) => {
  const res = await fetch(`${baseUrl}/api/classes/trainer/${trainerId}`, {
    headers: { ...(await getHeader()) },
  });
  return res.json();
};
// Get Single Class details
export const getSingleClass = async (id) => {
  const res = await fetch(`${baseUrl}/api/classes/single/${id}`, {
    cache: "no-store",

    headers: { ...(await getHeader()) },
  });
  const myClass = await res.json();
  return myClass;
};
// Update Class
export const updateClass = async (id, updatedClass) => {
  const res = await fetch(`${baseUrl}/api/classes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeader()),
    },
    body: JSON.stringify(updatedClass),
  });

  return res.json();
};
// Update class status (for admin)
export const updateClassStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/classes/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeader()),
    },
    body: JSON.stringify({ status: status.toLowerCase() }),
  });

  return res.json();
};

// Delete Class:
export const deleteClass = async (id) => {
  const res = await fetch(`${baseUrl}/api/classes/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      ...(await getHeader()),
    },
  });
  return await res.json();
};

// Get featured classes
export const getTopClasses = async () => {
  const res = await fetch(`${baseUrl}/api/classes/top`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch top classes");
  }

  return res.json();
};

// Get featured classes
export const getLatestClasses = async () => {
  const res = await fetch(`${baseUrl}/api/classes/latest`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch latest classes");
  }

  return res.json();
};
