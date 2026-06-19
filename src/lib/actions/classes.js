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

// Get trainer all Classes
export const getTrainerClasses = async (trainerId) => {
  const res = await fetch(`${baseUrl}/api/classes/trainer/${trainerId}`);
  return res.json();
};
// Get Single Class details
export const getSingleClass = async (id) => {
  const res = await fetch(`${baseUrl}/api/classes/single/${id}`);
  const myClass = await res.json();
  return myClass;
};
// Update Class
export const updateClass = async (id, updatedClass) => {
  const res = await fetch(`${baseUrl}/api/classes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedClass),
  });

  return res.json();
};

// Delete Job:
export const deleteClass = async (id) => {
  const res = await fetch(`${baseUrl}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
};
