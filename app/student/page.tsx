import { getLoggedInStudent } from "@/lib/services/users"
import { getAttendanceByStudentId } from "@/lib/services/attendances"
import StudentAttendanceDisplay from "@/components/student/student-attendance-display"

export default async function StudentPage() {
  const student = await getLoggedInStudent()

  if (!student) {
    return <div className="p-8 text-center">Loading student information...</div>
  }

  const attendances = await getAttendanceByStudentId(student.id)

  return <StudentAttendanceDisplay student={student} attendances={attendances} />
}
