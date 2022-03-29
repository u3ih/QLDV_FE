import { ActionTypes } from "../contants/action-type";

export const setStudents = (students) => {
    return {type: ActionTypes.SET_STUDENTS, payload: students}
}

export const selectedStudent = (student) => {
    return {
        type: ActionTypes.SELECTED_STUDENTS,
        payload: student
    }
}