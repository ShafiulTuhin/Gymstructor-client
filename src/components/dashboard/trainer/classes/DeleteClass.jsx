"use client";

import { deleteClass } from "@/lib/actions/classes";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const DeleteClass = ({ myClass }) => {
  const router = useRouter();

  const deleteSingleClass = async () => {
    const res = deleteClass(myClass?._id);

    toast.success(`${myClass.className} successfully deleted`);

    setTimeout(() => {
      router.push("/dashboard/trainer/classes");
    }, 1000);
  };
  return (
    <div>
      <AlertDialog>
        <Button isIconOnly size="sm" variant="light" color="danger">
          <FiTrash2 />
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]  bg-gradient-to-r from-[#4EA618] to-[#192425] text-white border border-zinc-800">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-white font-bold">
                  Delete Class permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-white">
                  This will permanently delete class of
                  <strong> {myClass.className}</strong> and all of its data.
                  This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" className="text-black">
                  Cancel
                </Button>
                <Button
                  onClick={deleteSingleClass}
                  slot="close"
                  variant="danger"
                >
                  Delete Class
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteClass;
