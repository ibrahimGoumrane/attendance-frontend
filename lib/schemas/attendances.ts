import { z } from "zod";

export const CreateAttendanceSchema = z.object({
  subject_id: z.string().nonempty("Subject is required"),
  student_id: z.string().nonempty("Student is required"),
  date: z.string().nonempty("Date is required"), // Using string for date input
  status: z.enum(["present", "absent"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be either present or absent",
  }),
});

export const UpdateAttendanceSchema = z.object({
  id: z.string().nonempty("ID is required"),
  date: z.string().optional(), // Optional for partial updates
  status: z.enum(["present", "absent"]).optional(), // Optional for partial updates
});

export const DeleteAttendanceSchema = z.object({
  id: z.string().nonempty("ID is required"),
});

export const attendanceCreateRenderFields = [
  {
    name: "subject_id",
    label: "Subject",
    type: "select",
    placeholder: "Select a subject",
    required: true,
  },
  {
    name: "student_id",
    label: "Student",
    type: "select",
    placeholder: "Select a student",
    required: true,
  },
  {
    name: "date",
    label: "Date",
    type: "datetime-local",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "present", label: "Present" },
      { value: "absent", label: "Absent" },
    ],
    required: true,
  },
];

export const attendanceUpdateRenderFields = [
  {
    name: "id",
    label: "ID",
    type: "hidden",
  },
  {
    name: "date",
    label: "Date",
    type: "datetime-local",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "present", label: "Present" },
      { value: "absent", label: "Absent" },
    ],
  },
];

export const attendanceDeleteRenderFields = [
  {
    name: "id",
    label: "ID",
    type: "hidden",
  },
];
