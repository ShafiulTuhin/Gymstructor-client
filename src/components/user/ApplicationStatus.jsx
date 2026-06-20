import React from "react";
import {
  FaInfoCircle,
  FaTimesCircle,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const ApplicationStatus = ({ myApplication }) => {
  const status = myApplication?.status;

  const getStatusUI = () => {
    if (status === "approved") {
      return {
        icon: <FaCheckCircle className="text-green-400" />,
        text: "Approved",
      };
    }

    if (status === "rejected") {
      return {
        icon: <FaTimesCircle className="text-red-400" />,
        text: "Rejected",
      };
    }

    return {
      icon: <FaHourglassHalf className="text-yellow-400" />,
      text: "Pending",
    };
  };

  const statusUI = getStatusUI();

  return (
    <div className="bg-gradient-to-b from-[#4EA618] to-[#192425] border border-white/10 rounded-2xl p-6 shadow-2xl mt-5 md:mt-0">
      {/* Heading */}
      <h2 className="text-xl font-bold text-white mb-4">Application Status</h2>

      {/* Status */}
      <div className="flex items-center gap-2 text-gray-300">
        <FaInfoCircle className="text-[#00C2FF]" />
        <span>Status:</span>
        <span className="flex items-center gap-2 font-semibold text-white">
          {statusUI.icon}
          {statusUI.text}
        </span>
      </div>

      {/* Admin message (only if rejected) */}
      {status === "rejected" && myApplication?.adminMessage && (
        <div className="mt-4 bg-[#0b1220] border border-red-500/30 rounded-xl p-4">
          <p className="text-red-300 text-sm">
            <span className="font-semibold">Admin message:</span>
            {myApplication.adminMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
