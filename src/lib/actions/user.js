"use server";

import { revalidatePath } from "next/cache";
import { getHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createNewTrainerApplication = async (newTrainerData) => {
  const res = await fetch(`${baseUrl}/api/apply-for-trainer`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(await getHeader()),
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
// Get trainer application(for Admin)
export const getAllTrainerApplication = async () => {
  const res = await fetch(`${baseUrl}/api/trainer/applications`, {
    headers: { ...(await getHeader()) },
  });
  const applications = await res.json();
  return applications.applications;
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
      ...(await getHeader()),
    },
    body: JSON.stringify({
      sessionId,
      userId,
      classId,
      trainerId,
    }),
  });

  const data = await res.json();
  return data;
};
// Update trainer application:
export const updateTrainerApplication = async (id, payload) => {
  const res = await fetch(`${baseUrl}/api/trainer/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(await getHeader()) },
    body: JSON.stringify(payload),
  });

  return res.json();
};

// Get payment and booking details for user(own)
export const getBookingDetails = async (userId) => {
  const res = await fetch(`${baseUrl}/api/bookings/${userId}`, {
    headers: { ...(await getHeader()) },
  });
  return res.json();
};
// Get payment and booking details for admin:
export const getAllBookings = async () => {
  const res = await fetch(`${baseUrl}/api/bookings`, {
    headers: { ...(await getHeader()) },
  });
  const bookings = await res.json();
  return bookings.data;
};

// Get all Bookings of trainer's classes by trainerId:
export const getBookingsOfTrainerClasses = async (classIds) => {
  const res = await fetch(`${baseUrl}/api/bookings/trainer-classes`, {
    method: "POST", // POST so you can send array in body
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeader()),
    },
    body: JSON.stringify({ classIds }),
  });

  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
};

// Get all Users:
export const getAllUser = async () => {
  const res = await fetch(`${baseUrl}/api/users`, {
    headers: { ...(await getHeader()) },
  });
  const data = await res.json();
  return data.users;
};

export const updateUserRole = async (userId, role) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(await getHeader()) },
    body: JSON.stringify({ role }),
  });
  revalidatePath("/dashboard/admin/users");
  return res.json();
};

export const updateUserStatus = async (userId, status) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...(await getHeader()) },
    body: JSON.stringify({ status }),
  });
  revalidatePath("/dashboard/admin/users");
  return res.json();
};

// Get all payment history:
export const getAllPaymentHistory = async () => {
  const res = await fetch(`${baseUrl}/api/payments`, {
    headers: { ...(await getHeader()) },
  });
  const result = await res.json();
  return result;
};
