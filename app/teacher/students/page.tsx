import StudentList from "@/components/teacher/students/list";
import { getAllClasses } from "@/lib/services/classes";
import { getAllStudents } from "@/lib/services/students";



export default async function StudentsPage() {
  const students = await getAllStudents();
  const classes = await getAllClasses();
  return <StudentList students={students} classes={classes}/>
}
