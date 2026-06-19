"use client";
import { updateForum } from "@/lib/actions/forums";
import {
  Button,
  Fieldset,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

const EditForum = ({ myForum, user }) => {
  const { _id, authorName, title, image, description } = myForum;
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(image);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

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

      setImageUrl(data.data.url); // final saved image
      setPreviewUrl(data.data.url); // only for preview

      setUploading(false);
    } catch (error) {
      console.error(error);
      toast.error("Image upload error");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedForum = Object.fromEntries(formData.entries());

    // ✅ overwrite image with ImageBB URL
    updatedForum.image = imageUrl;

    await updateForum(_id, updatedForum);

    toast.success("Your change has been updated");

    user?.role === "trainer"
      ? router.push("/dashboard/trainer/forums")
      : router.push("/dashboard/admin/forums");
  };
  return (
    <div>
      <Modal>
        <Button className="flex items-center justify-center rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600">
          <FiEdit />
        </Button>

        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog className="sm:max-w-2xl w-full max-h-[90vh] flex flex-col bg-gradient-to-r from-[#4EA618] to-[#192425] text-white rounded-2xl shadow-2xl">
              <Modal.CloseTrigger />

              {/* HEADER */}
              <Modal.Header className="border-b border-gray-200 px-6 py-4">
                <Modal.Heading className="text-lg font-bold">
                  Edit Forum Information
                </Modal.Heading>
              </Modal.Header>

              {/* BODY */}
              <Modal.Body className="px-6 py-5 overflow-y-auto flex-1 space-y-6">
                <Surface className="bg-transparent">
                  <Form
                    id="edit-job-form"
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {/* SECTION 1 */}
                    <Fieldset className="space-y-5">
                      {/* GRID */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField name="className" defaultValue={authorName}>
                          <Label className="text-white text-sm mb-1">
                            Author Name
                          </Label>
                          <Input
                            name="authorName"
                            readOnly
                            className="bg-gray-200 rounded-lg"
                          />
                        </TextField>
                        <TextField name="className" defaultValue={title}>
                          <Label className="text-white text-sm mb-1">
                            Title
                          </Label>
                          <Input
                            name="title"
                            className="bg-gray-200 rounded-lg"
                          />
                        </TextField>
                      </div>
                    </Fieldset>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="w-full p-2 bg-gray-200 rounded"
                    />

                    {previewUrl && (
                      <Image
                        src={previewUrl}
                        alt="preview"
                        width={150}
                        height={160}
                        radius="md"
                        removeWrapper
                        className="object-cover mt-3"
                      />
                    )}

                    <Fieldset className="space-y-4">
                      <div>
                        <Label className="text-white text-sm mb-1 block">
                          Description
                        </Label>

                        <TextArea
                          name="description"
                          defaultValue={description}
                          rows={4}
                          className="bg-gray-200 rounded-lg w-full"
                        />
                      </div>
                    </Fieldset>
                  </Form>
                </Surface>
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

                <Button
                  type="submit"
                  form="edit-job-form"
                  className="bg-gradient-to-r from-[#4EA618] to-[#192425] text-white rounded-lg px-5"
                  slot="close"
                >
                  Update Forum
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditForum;
