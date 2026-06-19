// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// import { createClass } from "@/lib/actions/classes";

// const CreateClass = () => {
//   const [imageUrl, setImageUrl] = useState("");

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // 🔥 ImageBB upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];

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
//     setImageUrl(data.data.url);
//   };

//   // 🔥 Submit class
//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         className: data.className,
//         image: imageUrl,
//         category: data.category,
//         difficulty: data.difficulty,
//         duration: data.duration,
//         schedule: JSON.parse(data.schedule), // simple approach
//         price: Number(data.price),
//         description: data.description,
//         status: "Pending",
//       };

//       const res = await createClass(payload);

//       toast.success("Class created successfully!");
//       reset();
//       setImageUrl("");
//     } catch (error) {
//       toast.error("Failed to create class");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0F3D3E] p-6 text-white">
//       <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl border border-white/20">
//         <h2 className="text-2xl font-bold mb-6">Create Class</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Class Name */}
//           <input
//             {...register("className", {
//               required: "Class name is required",
//             })}
//             placeholder="Class Name"
//             className="w-full p-2 rounded bg-gray-800"
//           />

//           {errors.className && (
//             <p className="text-red-400 text-sm">{errors.className.message}</p>
//           )}

//           {/* Image Upload */}
//           <input
//             type="file"
//             onChange={handleImageUpload}
//             className="w-full p-2 bg-gray-800 rounded"
//           />

//           {imageUrl && (
//             <img src={imageUrl} className="w-full h-40 object-cover rounded" />
//           )}

//           {/* Category */}
//           <input
//             {...register("category", {
//               required: "Category is required",
//             })}
//             placeholder="Category (Yoga, Gym, Cardio)"
//             className="w-full p-2 rounded bg-gray-800"
//           />

//           {errors.category && (
//             <p className="text-red-400 text-sm">{errors.category.message}</p>
//           )}

//           {/* Difficulty */}
//           <select
//             {...register("difficulty")}
//             defaultValue="beginner"
//             className="w-full p-2 rounded bg-gray-800"
//           >
//             <option value="beginner">Beginner</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//           </select>

//           {/* Duration */}
//           <input
//             {...register("duration", {
//               required: "Duration is required",
//             })}
//             placeholder="Duration (e.g. 60 mins)"
//             className="w-full p-2 rounded bg-gray-800"
//           />

//           {errors.duration && (
//             <p className="text-red-400 text-sm">{errors.duration.message}</p>
//           )}

//           {/* Schedule */}
//           {/* <textarea
//             {...register("schedule", {
//               required: "Schedule is required",
//             })}
//             placeholder='Schedule JSON: [{"day":"Mon","time":"10 AM"}]'
//             className="w-full p-2 rounded bg-gray-800"
//           />

//           {errors.schedule && (
//             <p className="text-red-400 text-sm">{errors.schedule.message}</p>
//           )} */}

//           {/* Price */}
//           <input
//             type="number"
//             {...register("price", {
//               required: "Price is required",
//               min: {
//                 value: 1,
//                 message: "Price must be greater than 0",
//               },
//             })}
//             placeholder="Price"
//             className="w-full p-2 rounded bg-gray-800"
//           />

//           {errors.price && (
//             <p className="text-red-400 text-sm">{errors.price.message}</p>
//           )}

//           {/* Description */}
//           <textarea
//             {...register("description")}
//             placeholder="Description"
//             className="w-full p-2 rounded bg-gray-800"
//           />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-[#4EA618] p-2 rounded font-bold"
//           >
//             Create Class
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
  console.log(user);

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // ✅ Schedule state
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

  // 🔥 Image upload (safe)
  const handleImageUpload = async (e) => {
    try {
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
    } catch (error) {
      console.error(error);
      toast.error("Image upload error");
      setUploading(false);
    }
  };

  // 🔥 Submit class
  const onSubmit = async (data) => {
    try {
      if (!imageUrl) {
        toast.error("Image is required");
        return;
      }

      const payload = {
        className: data.className,
        trainerId: user?.id,
        image: imageUrl,
        category: data.category,
        difficulty: data.difficulty,
        duration: data.duration,
        schedule: schedule, // ✅ REAL schedule
        price: Number(data.price),
        description: data.description,
        // status: "pending",
      };

      const res = await createClass(payload);

      console.log("Create class response:", res);

      toast.success("Class created successfully!");

      router.push("/dashboard/trainer/classes");

      reset();
      setImageUrl("");
      setSchedule([{ day: "Monday", time: "" }]);
    } catch (error) {
      console.error("Create class error:", error);
      toast.error(error?.message || "Failed to create class");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F3D3E] p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-6">Create Class</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Class Name */}
          <input
            {...register("className", {
              required: "Class name is required",
            })}
            placeholder="Class Name"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.className && (
            <p className="text-red-400 text-sm">{errors.className.message}</p>
          )}

          {/* Image Upload */}
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 bg-gray-800 rounded"
          />

          {uploading && (
            <p className="text-yellow-300 text-sm">Uploading image...</p>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              className="w-full h-40 object-cover rounded"
              alt="preview"
            />
          )}

          {/* Category */}
          <input
            {...register("category", {
              required: "Category is required",
            })}
            placeholder="Category (Yoga, Gym, Cardio)"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category.message}</p>
          )}

          {/* Difficulty */}
          <select
            {...register("difficulty")}
            className="w-full p-2 rounded bg-gray-800"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Duration */}
          <input
            {...register("duration", {
              required: "Duration is required",
            })}
            placeholder="Duration (e.g. 60 mins)"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.duration && (
            <p className="text-red-400 text-sm">{errors.duration.message}</p>
          )}

          {/* ================= SCHEDULE ================= */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Class Schedule</label>

            {schedule.map((item, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={item.day}
                  onChange={(e) => {
                    const updated = [...schedule];
                    updated[index].day = e.target.value;
                    setSchedule(updated);
                  }}
                  className="p-2 rounded bg-gray-800 w-1/2"
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>

                <input
                  type="text"
                  placeholder="Time (e.g. 10 AM)"
                  value={item.time}
                  onChange={(e) => {
                    const updated = [...schedule];
                    updated[index].time = e.target.value;
                    setSchedule(updated);
                  }}
                  className="p-2 rounded bg-gray-800 w-1/2"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setSchedule([...schedule, { day: "Monday", time: "" }])
              }
              className="text-sm text-green-400"
            >
              + Add More
            </button>
          </div>

          {/* Price */}
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            })}
            placeholder="Price"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.price && (
            <p className="text-red-400 text-sm">{errors.price.message}</p>
          )}

          {/* Description */}
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="w-full p-2 rounded bg-gray-800"
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#4EA618] p-2 rounded font-bold disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Create Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
