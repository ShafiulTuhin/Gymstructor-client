"use server";
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
