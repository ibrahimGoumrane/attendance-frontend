import { getLoggedInStudent } from "@/lib/services/users"
import { getStudentImages } from "@/lib/services/students"
import StudentImagesDisplay from "@/components/student/student-images-display"

export default async function StudentImage() {
  const student = await getLoggedInStudent()

  if (!student) {
    return <div className="p-8 text-center">Loading student information...</div>
  }

  // ✅ Utilise l'ID de l'étudiant, pas l'ID de l'utilisateur
  const studentImages = await getStudentImages(student.id)

  return <StudentImagesDisplay student={student} studentImages={studentImages} />
}
