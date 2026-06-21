"use server";

import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createNewTrainerApplication = async (newTrainerData) => {
  const res = await fetch(`${baseUrl}/api/apply-for-trainer`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newTrainerData),
  });

  const data = await res.json();
  return data;
};

export const getNewTrainerApplication = async (applicantId) => {
  const res = await fetch(`${baseUrl}/api/apply-for-trainer/${applicantId}`);
  const data = await res.json();
  return data;
};

export const createPaymentAndBooking = async ({
  sessionId,
  userId,
  classId,
}) => {
  const res = await fetch(`${baseUrl}/api/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      userId,
      classId,
    }),
  });

  const data = await res.json();
  return data;
};

// Get payment and booking details for user
export const getBookingAndPaymentDetails = async (userId) => {
  const res = await fetch(`${baseUrl}/api/payment/${userId}`);

  // 1. Get the response as plain text first to see what it actually is
  const textData = await res.text();
  console.log("RAW RESPONSE FROM SERVER FOR PAYMENTS:", textData);

  // 2. Try parsing it manually to catch the exact moment it fails
  try {
    return JSON.parse(textData);
  } catch (err) {
    console.error(
      "This is the endpoint that broke! Failed parsing:",
      baseUrl + `/api/payment/${userId}`,
    );
    return { error: true };
  }
};
// Get payment and booking details for admin:
export const getAllBookings = async () => {
  const res = await fetch(`${baseUrl}/api/payments`);
  const bookings = await res.json();
  return bookings.data;
};

// Get all Users:
export const getAllUser = async () => {
  const res = await fetch(`${baseUrl}/api/users`);
  const data = await res.json();
  return data.users;
};

export const updateUserRole = async (userId, role) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
  revalidatePath("/dashboard/admin/users");
  return res.json();
};

export const updateUserStatus = async (userId, status) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  revalidatePath("/dashboard/admin/users");
  return res.json();
};
