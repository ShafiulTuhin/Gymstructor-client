"use client";

import { deleteForum } from "@/lib/actions/forums";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const DeleteForum = ({ myForum, user }) => {
  const router = useRouter();

  // const delForum = async () => {
  //   // const res = await fetch(
  //   //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/forums/${myForum._id}`,
  //   //   {
  //   //     method: "DELETE",
  //   //     headers: {
  //   //       "content-type": "application/json",
  //   //       ...(await getHeader()),
  //   //     },
  //   //   },
  //   // );
  //   // await res.json();
  //   await deleteForum(myForum._id);

  //   toast.success(`${myForum.title} successfully deleted`);

  //   setTimeout(() => {
  //     user?.role === "trainer"
  //       ? router.push("/dashboard/trainer/forums")
  //       : router.push("/dashboard/admin/forums");
  //   }, 1000);
  // };
  const delForum = async () => {
    try {
      const res = await deleteForum(myForum._id);

      if (!res?.success && !res?.acknowledged) {
        toast.error("Delete failed");
        return;
      }

      toast.success(`${myForum.title} successfully deleted`);

      setTimeout(() => {
        if (user?.role === "trainer") {
          router.push("/dashboard/trainer/forums");
        } else {
          router.push("/dashboard/admin/forums");
        }

        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <AlertDialog>
        <Button className="flex gap-2 items-center justify-center rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600">
          <FiTrash2 />
          Delete
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]  bg-gradient-to-r from-[#071E22] to-[#0F3D3E] text-white border border-zinc-800">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-white font-bold">
                  Delete Forum permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-white">
                  This will permanently delete FOrum of
                  <strong> {myForum.title}</strong> and all of its data. This
                  action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary" className="text-black">
                  Cancel
                </Button>
                <Button onClick={delForum} slot="close" variant="danger">
                  Delete Forum
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteForum;
