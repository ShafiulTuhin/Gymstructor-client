// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { createClass } from "@/lib/actions/classes";
// import { useRouter } from "next/navigation";

// const CreateClass = ({ user }) => {
//   const [imageUrl, setImageUrl] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const router = useRouter();

//   const [schedule, setSchedule] = useState([{ day: "Monday", time: "" }]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       difficulty: "beginner",
//     },
//   });

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("image", file);

//     const res = await fetch(
//       `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API}`,
//       {
//         method: "POST",
//         body: formData,
//       },
//     );

//     const data = await res.json();

//     if (!data?.data?.url) {
//       toast.error("Image upload failed");
//       setUploading(false);
//       return;
//     }

//     setImageUrl(data.data.url);
//     setUploading(false);
//   };

//   const onSubmit = async (data) => {
//     try {
//       if (!imageUrl) {
//         toast.error("Image is required");
//         return;
//       }

//       await createClass({
//         className: data.className,
//         trainerId: user?.id,
//         image: imageUrl,
//         category: data.category,
//         difficulty: data.difficulty,
//         duration: data.duration,
//         schedule,
//         price: Number(data.price),
//         description: data.description,
//       });

//       toast.success("Class created successfully!");
//       router.push("/dashboard/trainer/classes");

//       reset();
//       setImageUrl("");
//       setSchedule([{ day: "Monday", time: "" }]);
//     } catch (err) {
//       toast.error("Failed to create class");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#071E22] px-5 py-10 text-white">
//       <div className="mx-auto max-w-3xl rounded-2xl bg-[#0F3D3E] p-6 shadow-xl">
//         <h2 className="mb-6 text-2xl font-bold text-white">Create Class</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* CLASS NAME */}
//           <input
//             {...register("className", { required: "Class name is required" })}
//             placeholder="Class Name"
//             className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
//           />
//           {errors.className && (
//             <p className="text-sm text-red-400">{errors.className.message}</p>
//           )}
//           {/* IMAGE UPLOAD */}
//           <div>
//             <label className="mb-2 block text-sm text-gray-300">
//               Upload Image
//             </label>

//             <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-500 bg-[#173f40] p-4 text-center hover:border-[#4EA618]">
//               <input
//                 type="file"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//               {uploading ? "Uploading..." : "Click to upload image"}
//             </label>

//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 className="mt-3 h-40 w-full rounded-lg object-cover"
//               />
//             )}
//           </div>
//           {errors.image && (
//             <p className="text-sm text-red-400">{errors.image.message}</p>
//           )}

//           {/* CATEGORY + DIFFICULTY */}
//           <div className="grid grid-cols-2 gap-3">
//             <select
//               {...register("category")}
//               className="rounded-lg bg-[#173f40] p-3 text-white w-full"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select Category
//               </option>

//               <option value="yoga">Yoga</option>
//               <option value="weights">Weights</option>
//               <option value="gym">Gym</option>
//               <option value="cardio">Cardio</option>
//             </select>
//             {errors.category && (
//               <p className="text-sm text-red-400">{errors.category.message}</p>
//             )}

//             <select
//               {...register("difficulty")}
//               className="rounded-lg bg-[#173f40] p-3 text-white"
//             >
//               <option value="beginner">Beginner</option>
//               <option value="intermediate">Intermediate</option>
//               <option value="advanced">Advanced</option>
//             </select>
//             {errors.difficulty && (
//               <p className="text-sm text-red-400">
//                 {errors.difficulty.message}
//               </p>
//             )}
//           </div>

//           {/* DURATION */}
//           <input
//             {...register("duration", { required: true })}
//             placeholder="Duration (e.g. 60 mins)"
//             className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
//           />

//           {/* SCHEDULE */}
//           <div>
//             <p className="mb-2 text-sm text-gray-300">Schedule</p>

//             {schedule.map((item, i) => (
//               <div key={i} className="mb-2 flex gap-2">
//                 <select
//                   value={item.day}
//                   onChange={(e) => {
//                     const copy = [...schedule];
//                     copy[i].day = e.target.value;
//                     setSchedule(copy);
//                   }}
//                   className="w-1/2 rounded-lg bg-[#173f40] p-2"
//                 >
//                   <option>Monday</option>
//                   <option>Tuesday</option>
//                   <option>Wednesday</option>
//                   <option>Thursday</option>
//                   <option>Friday</option>
//                   <option>Saturday</option>
//                   <option>Sunday</option>
//                 </select>

//                 <input
//                   value={item.time}
//                   onChange={(e) => {
//                     const copy = [...schedule];
//                     copy[i].time = e.target.value;
//                     setSchedule(copy);
//                   }}
//                   placeholder="Time"
//                   className="w-1/2 rounded-lg bg-[#173f40] p-2"
//                 />
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={() =>
//                 setSchedule([...schedule, { day: "Monday", time: "" }])
//               }
//               className="text-sm text-[#4EA618]"
//             >
//               + Add Schedule
//             </button>
//           </div>

//           {/* PRICE */}
//           <input
//             type="number"
//             {...register("price", { required: true })}
//             placeholder="Price"
//             className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
//           />

//           {/* DESCRIPTION */}
//           <textarea
//             {...register("description", { required: true })}
//             placeholder="Description"
//             className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
//           />

//           {/* SUBMIT */}
//           <button
//             disabled={uploading}
//             className="w-full rounded-lg bg-[#4EA618] py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
//           >
//             {uploading ? "Uploading..." : "Create Class"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateClass;
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createClass } from "@/lib/actions/classes";
import { useRouter } from "next/navigation";

const CreateClass = ({ user }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const [schedule, setSchedule] = useState([{ day: "Monday", time: "" }]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      difficulty: "beginner",
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!data?.data?.url) {
      toast.error("Image upload failed");
      setUploading(false);
      return;
    }

    setImageUrl(data.data.url);
    setUploading(false);
  };

  const onSubmit = async (data) => {
    try {
      if (!imageUrl) {
        toast.error("Image is required");
        return;
      }

      await createClass({
        className: data.className,
        trainerId: user?.id,
        image: imageUrl,
        category: data.category,
        difficulty: data.difficulty,
        duration: data.duration,
        schedule,
        price: Number(data.price),
        description: data.description,
      });

      toast.success("Class created successfully!");
      router.push("/dashboard/trainer/classes");

      reset();
      setImageUrl("");
      setSchedule([{ day: "Monday", time: "" }]);
    } catch (err) {
      toast.error("Failed to create class");
    }
  };

  return (
    <div className="min-h-screen bg-[#071E22] px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl bg-[#0F3D3E] p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-white">Create Class</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* CLASS NAME */}
          <input
            {...register("className", {
              required: "Class name is required",
            })}
            placeholder="Class Name"
            className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
          />
          {errors.className && (
            <p className="text-sm text-red-400">{errors.className.message}</p>
          )}

          {/* IMAGE */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Upload Image
            </label>

            <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-500 bg-[#173f40] p-4 text-center hover:border-[#4EA618]">
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
              {uploading ? "Uploading..." : "Click to upload image"}
            </label>

            {imageUrl && (
              <img
                src={imageUrl}
                className="mt-3 h-40 w-full rounded-lg object-cover"
              />
            )}
          </div>

          {/* CATEGORY + DIFFICULTY */}
          <div className="grid grid-cols-2 gap-3">
            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full rounded-lg bg-[#173f40] p-3 text-white"
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="yoga">Yoga</option>
              <option value="weights">Weights</option>
              <option value="gym">Gym</option>
              <option value="cardio">Cardio</option>
            </select>

            {errors.category && (
              <p className="text-sm text-red-400">{errors.category.message}</p>
            )}

            <select
              {...register("difficulty", {
                required: "Difficulty is required",
              })}
              className="rounded-lg bg-[#173f40] p-3 text-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {errors.difficulty && (
              <p className="text-sm text-red-400">
                {errors.difficulty.message}
              </p>
            )}
          </div>

          {/* DURATION */}
          <input
            {...register("duration", {
              required: "Duration is required",
            })}
            placeholder="Duration"
            className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
          />
          {errors.duration && (
            <p className="text-sm text-red-400">{errors.duration.message}</p>
          )}

          {/* PRICE */}
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
            })}
            placeholder="Price"
            className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
          />
          {errors.price && (
            <p className="text-sm text-red-400">{errors.price.message}</p>
          )}

          {/* DESCRIPTION */}
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
          />
          {errors.description && (
            <p className="text-sm text-red-400">{errors.description.message}</p>
          )}

          {/* SUBMIT */}
          <button
            disabled={uploading}
            className="w-full rounded-lg bg-[#4EA618] py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Create Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
