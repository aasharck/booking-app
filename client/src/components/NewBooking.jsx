import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dropdown } from "./Dropdown";
import { DatePicker } from "./Datepicker";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"

const NewBooking = ({
  open,
  setOpen,
  handleChange,
  handleSubmit,
  data,
  setDate,
  date,
  doctor,
  setDoctor,
  loading,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-xl font-bold leading-6 text-gray-900">
                        Create a New Booking
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="mb-3">
                        <Label htmlFor="insurance">Insurance Number</Label>
                        <Input
                          name="insuranceNo"
                          type="number"
                          id="insurance"
                          value={data.insuranceNo}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          name="phoneNumber"
                          type="number"
                          id="phone"
                          placeholder="+966 123 456"
                          value={data.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <Dropdown value={doctor} setValue={setDoctor} />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="message">Select a Date and Time</Label>
                        <DatePicker date={date} setDate={setDate} />
                        <input
                          type="time"
                          name="time"
                          className="py-2 h-10 rounded ml-2 px-1 border w-auto"
                          value={data.time}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="message">Your Symptoms</Label>
                        <Textarea
                          name="symptoms"
                          placeholder="Type your symptoms here."
                          id="message"
                          value={data.symptoms}
                          onChange={handleChange}
                        />
                      </div>
                      <Button onClick={handleSubmit} disabled={loading}>
                        {loading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {loading ? "Scheduling..." : "Schedule an Appointment"}
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewBooking;
