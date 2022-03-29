import { ActionTypes } from "../contants/action-type";

export const setCourses = (courses) => {
    return {type: ActionTypes.SET_COURSES, payload: courses}
}
