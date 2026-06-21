import Link from "next/link";
import React from "react";
import TrainerApprovalModal from "./TrainerApprovalModal";

const PendingApplicantList = ({ applications }) => {
  return (
    <div className="min-h-screen p-6 bg-[#071E22] text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Pending Trainer Applications
        </h2>
        <p className="text-sm text-slate-400">
          Total Applications: {applications?.length || 0}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#0F3D3E] text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Applicant Name</th>
              <th className="px-4 py-3">Speciality</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied On</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications?.length > 0 ? (
              applications.map((application, index) => (
                <tr
                  key={application?._id || index}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {application?.applicantName || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {application?.specialty || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {application?.experience || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    <p className="bg-amber-200 w-1/2  text-center p-2 rounded-full text-gray-800">
                      {" "}
                      {(application?.status || "N/A").charAt(0).toUpperCase() +
                        (application?.status || "N/A").slice(1)}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-gray-300">
                    {application?.createdAt
                      ? new Date(application.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {/* <Link
                      href={`/dashboard/admin/applications/${application?._id}`}
                      className="inline-block rounded-lg bg-[#00C2FF] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
                    >
                      Details
                    </Link> */}
                    <TrainerApprovalModal application={application} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No pending applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingApplicantList;
