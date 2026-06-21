"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { createNewTrainerApplication } from "@/lib/actions/user";

const NewTrainerApplicationForm = ({ user }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createNewTrainerApplication({
        experience: data.experience,
        applicantId: user?.id,
        applicantName: user?.name,
        specialty: data.specialty,
      });

      toast.success("Application submitted successfully!");

      router.push("/dashboard/user");

      reset();
    } catch (error) {
      toast.error("Failed to create application");
    }
  };

  const handleBlockedUser = (e) => {
    if (user?.status === "blocked") {
      e.preventDefault();
      toast.error("Action restricted by Admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl bg-[#0F3D3E] p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">Create Forum</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Experience */}
          <input
            {...register("experience", { required: "Experience is required" })}
            placeholder="Experience"
            className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
          />
          {errors.experience && (
            <p className="text-sm text-red-400">{errors.experience.message}</p>
          )}

          <select
            {...register("specialty")}
            className="rounded-lg bg-[#173f40] p-3 text-white w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select specialty
            </option>

            <option value="yoga">Yoga</option>
            <option value="weights">Weights</option>
            <option value="gym">Gym</option>
            <option value="cardio">Cardio</option>
          </select>
          {errors.specialty && (
            <p className="text-sm text-red-400">{errors.specialty.message}</p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            onClick={handleBlockedUser}
            className="w-full rounded-lg bg-[#4EA618] py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTrainerApplicationForm;
