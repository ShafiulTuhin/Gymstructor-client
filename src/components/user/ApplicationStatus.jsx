// export default ApplicationStatus;
import React from "react";
import {
  FaInfoCircle,
  FaTimesCircle,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const ApplicationStatus = ({ myApplication }) => {
  // No application found
  if (!myApplication) {
    return (
      <div className="w-full max-w-3xl mt-10 rounded-2xl overflow-hidden border border-[#173f40] shadow-2xl">
        <div className="bg-[#0B2C2E] px-6 py-4 border-b border-[#173f40]">
          <h2 className="text-2xl font-bold text-white">Application Status</h2>
        </div>

        <div className="bg-[#0F3D3E] p-6">
          <div className="rounded-2xl border border-gray-500/30 bg-gray-500/10 p-6 flex items-center gap-4">
            <FaInfoCircle className="text-3xl text-gray-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">
                No Application Found
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                You haven't submitted a trainer application yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusMap = {
    approved: {
      icon: <FaCheckCircle className="text-green-400 text-2xl" />,
      color: "border-green-500/30 bg-green-500/10",
      text: "Approved",
    },
    rejected: {
      icon: <FaTimesCircle className="text-red-400 text-2xl" />,
      color: "border-red-500/30 bg-red-500/10",
      text: "Rejected",
    },
    pending: {
      icon: <FaHourglassHalf className="text-yellow-400 text-2xl" />,
      color: "border-yellow-500/30 bg-yellow-500/10",
      text: "Pending",
    },
  };

  const current = statusMap[myApplication.status?.toLowerCase()];

  return (
    <div className="w-full max-w-3xl mt-10 rounded-2xl overflow-hidden border border-[#173f40] shadow-2xl">
      <div className="bg-[#0B2C2E] px-6 py-4 border-b border-[#173f40]">
        <h2 className="text-2xl font-bold text-white">Application Status</h2>
      </div>

      <div className="bg-[#0F3D3E] p-6">
        <div className={`rounded-2xl border p-6 ${current.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Current Status</p>
              <h3 className="text-xl font-semibold text-white mt-1">
                Trainer Application
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-[#071E22] flex items-center justify-center">
              {current.icon}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <FaInfoCircle className="text-[#00C2FF]" />
            <span className="text-lg font-semibold text-white">
              {current.text}
            </span>
          </div>

          {myApplication.status === "rejected" &&
            myApplication.adminMessage && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-[#071E22] p-4">
                <p className="text-red-300 leading-7">
                  <span className="font-semibold">Admin Message:</span>{" "}
                  {myApplication.adminMessage}
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
