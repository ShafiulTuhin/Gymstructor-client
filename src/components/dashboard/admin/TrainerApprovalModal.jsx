"use client";

import { updateClass } from "@/lib/actions/classes";
import { updateTrainerApplication } from "@/lib/actions/user";

import { Button, Label, Modal, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

const TrainerApprovalModal = ({ application }) => {
  const { _id, applicantName, specialty, experience, status } = application;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    const res = await updateTrainerApplication(_id, updatedData);

    if (res.modifiedCount > 0) {
      toast.success("Application updated successfully");
    } else {
      toast.error("No changes made");
    }

    router.push("/dashboard/admin/trainer-applications");
  };

  return (
    <Modal>
      <Button className="inline-block rounded-lg bg-[#4EA618] hover:bg-green-600 transition  px-4 py-2 text-xs font-medium text-white transition hover:opacity-90">
        Details
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-2xl w-full max-h-[90vh] flex flex-col bg-[#071E22] text-white rounded-2xl shadow-2xl">
            <Modal.CloseTrigger />

            {/* HEADER */}
            <Modal.Header className="border-b border-gray-500 px-6 py-4">
              <Modal.Heading className="text-lg font-semibold text-gray-300">
                Review Trainer Application
              </Modal.Heading>
            </Modal.Header>

            {/* BODY */}

            <Modal.Body className="px-6 py-5 overflow-y-auto flex-1">
              <form
                id="edit-application-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Applicant Name
                  </label>
                  <input
                    name="applicantName"
                    defaultValue={applicantName}
                    readOnly
                    className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Specialty
                  </label>
                  <input
                    name="specialty"
                    defaultValue={specialty}
                    readOnly
                    className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Experience
                  </label>
                  <input
                    name="experience"
                    defaultValue={experience}
                    readOnly
                    className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Status
                  </label>

                  <select
                    name="status"
                    defaultValue={status || "pending"}
                    className="w-full rounded-lg bg-[#173f40] p-3 text-white outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">
                    Admin Message
                  </Label>

                  <TextArea
                    name="adminMessage"
                    defaultValue=""
                    placeholder="Write admin message..."
                    className="w-full min-h-[120px] bg-[#173f40] text-white rounded-lg p-3 outline-none border border-white/10 focus:border-[#4EA618]"
                  />
                </div>
              </form>
            </Modal.Body>

            {/* FOOTER */}
            <Modal.Footer className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                slot="close"
                className="text-white rounded-lg"
              >
                Cancel
              </Button>
              <form id="edit-application-form" onSubmit={handleSubmit}>
                {" "}
                <Button
                  type="submit"
                  form="edit-application-form"
                  className="bg-[#4EA618] hover:bg-green-600 transition  text-white rounded-lg px-5"
                  slot="close"
                >
                  Update Application
                </Button>
              </form>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default TrainerApprovalModal;
