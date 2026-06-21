"use client";

import { updateClass } from "@/lib/actions/classes";

import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
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
  const scheduleData = myClass?.schedule || [];
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
          <Modal.Dialog className="sm:max-w-2xl w-full max-h-[90vh] flex flex-col  bg-[#071E22]  text-white rounded-2xl shadow-2xl">
            <Modal.CloseTrigger />

            {/* HEADER */}
            <Modal.Header className="border-b border-gray-200 px-6 py-4">
              <Modal.Heading className="text-lg font-semibold text-gray-300">
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
                          className="bg-[#173f40] rounded-lg text-white"
                        />
                      </TextField>

                      <div>
                        <Select
                          name="category"
                          defaultSelectedKey={category || undefined}
                        >
                          <Label className="text-white">Category</Label>
                          <Select.Trigger className="bg-[#173f40] text-white">
                            {/* TIP: Add a placeholder here for when category is empty */}
                            <Select.Value placeholder="Select a category" />
                            <Select.Indicator className="text-gray-900" />
                          </Select.Trigger>

                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="yoga">Yoga</ListBox.Item>
                              <ListBox.Item id="gym">Gym</ListBox.Item>
                              <ListBox.Item id="cardio">Cardio</ListBox.Item>
                              <ListBox.Item id="weights">Weights</ListBox.Item>
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
                          <Select.Trigger className="bg-[#173f40] w-full rounded-lg text-white">
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
                          className="bg-[#173f40] rounded-lg text-white"
                          placeholder="e.g. 60 mins"
                        />
                      </div>
                    </div>
                  </Fieldset>
                  {/* SCHEDULE */}
                  {/* SCHEDULE */}
                  <div>
                    <Label className="text-white text-sm mb-2 block">
                      Schedule
                    </Label>

                    {(scheduleData?.length > 0
                      ? scheduleData
                      : [{ day: "", time: "" }]
                    ).map((item, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3 mb-3">
                        {/* DAY DROPDOWN */}
                        <select
                          name={`schedule[${index}].day`}
                          defaultValue={item?.day || ""}
                          className="bg-[#173f40] rounded-lg text-white w-full p-2 text-white"
                        >
                          <option value="" disabled>
                            Select Day
                          </option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>

                        {/* TIME PICKER */}
                        <input
                          type="time"
                          name={`schedule[${index}].time`}
                          defaultValue={item?.time || ""}
                          className="bg-[#173f40] rounded-lg text-white w-full p-2 text-white"
                        />
                      </div>
                    ))}

                    {/* EMPTY STATE */}
                    {(!scheduleData || scheduleData.length === 0) && (
                      <p className="text-gray-400 text-sm">No schedule added</p>
                    )}
                  </div>
                  {/* SECTION 2 */}

                  <Fieldset className="space-y-4">
                    <div>
                      <Label className="text-white text-sm mb-1 block">
                        Price
                      </Label>

                      <input
                        name="price"
                        defaultValue={price}
                        className="bg-[#173f40] rounded-lg text-white w-full p-2"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-1 block">
                        Description
                      </Label>

                      <TextArea
                        name="description"
                        defaultValue={description}
                        rows={4}
                        className="bg-[#173f40] rounded-lg text-white w-full"
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
