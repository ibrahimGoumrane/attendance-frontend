import { State } from "../schemas/base";
import { CreateTeacherSchema } from "../schemas/teachers";
import { teacherApiResource } from "../services/teachers";

export const addTeacher = (prevState: State, newTeacher: FormData) => {
  return teacherApiResource.createAction(
    prevState,
    newTeacher,
    CreateTeacherSchema
  );
};
