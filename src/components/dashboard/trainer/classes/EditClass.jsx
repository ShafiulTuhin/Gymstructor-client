"use client";

import { updateClass } from "@/lib/actions/classes";

import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  Switch,
  TextArea,
  TextField,
  Select,
  Form,
  Fieldset,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

const EditClass = ({ myClass }) => {
  const { _id, className, category, difficulty, duration, price, description } =
    myClass;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedClass = Object.fromEntries(formData.entries());

    await updateClass(_id, updatedClass);
    toast.success("Your change has been updated");
    router.push("/dashboard/trainer/classes");
  };

  return (
    <Modal>
      <Button isIconOnly size="sm" variant="light">
        <FiEdit />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-2xl w-full max-h-[90vh] flex flex-col bg-gradient-to-r from-[#4EA618] to-[#192425] text-white rounded-2xl shadow-2xl">
            <Modal.CloseTrigger />

            {/* HEADER */}
            <Modal.Header className="border-b border-gray-200 px-6 py-4">
              <Modal.Heading className="text-lg font-semibold">
                Edit Class Information
              </Modal.Heading>
            </Modal.Header>

            {/* BODY */}
            <Modal.Body className="px-6 py-5 overflow-y-auto flex-1 space-y-6">
              <Surface className="bg-transparent">
                <Form
                  id="edit-class-form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* SECTION 1 */}
                  <Fieldset className="space-y-5">
                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <TextField name="className" defaultValue={className}>
                        <Label className="text-white text-sm mb-1">
                          Class Name
                        </Label>
                        <Input
                          name="className"
                          className="bg-gray-200 rounded-lg"
                        />
                      </TextField>

                      <div>
                        <Select name="category" defaultValue={category || ""}>
                          <Label className="text-white">Category</Label>
                          <Select.Trigger className="bg-gray-200">
                            <Select.Value />
                            <Select.Indicator className="text-gray-900" />
                          </Select.Trigger>

                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="yoga">Yoga</ListBox.Item>
                              <ListBox.Item id="gym">Gym</ListBox.Item>
                              <ListBox.Item id="cardio">Cardio</ListBox.Item>
                              {/* <ListBox.Item id="sales">Sales</ListBox.Item> */}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>
                    </div>

                    {/* SECOND ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <Label className="text-white text-sm mb-1 block">
                          Difficulty
                        </Label>

                        <Select name="difficulty" defaultValue={difficulty}>
                          <Select.Trigger className="bg-gray-200 w-full rounded-lg">
                            <Select.Value />
                          </Select.Trigger>

                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="beginner">
                                Beginner
                              </ListBox.Item>
                              <ListBox.Item id="intermediate">
                                Intermediate
                              </ListBox.Item>
                              <ListBox.Item id="advanced">
                                Advanced
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-white text-sm mb-1 block">
                          Duration
                        </Label>

                        <Input
                          name="duration"
                          defaultValue={duration}
                          className="bg-gray-200 rounded-lg"
                          placeholder="e.g. 60 mins"
                        />
                      </div>
                    </div>
                  </Fieldset>

                  {/* SECTION 2 */}
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

                    <div>
                      <Label className="text-white text-sm mb-1 block">
                        Price
                      </Label>

                      <input
                        name="price"
                        defaultValue={price}
                        className="bg-gray-200 rounded-lg w-full p-2"
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
                form="edit-class-form"
                className="bg-gradient-to-r from-[#4EA618] to-[#192425] text-white rounded-lg px-5"
                slot="close"
              >
                Update Class
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditClass;
