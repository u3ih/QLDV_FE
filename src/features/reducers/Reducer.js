import { ActionTypes } from "../contants/action-type";

export const studentsReducer = (state = {students: []}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_STUDENTS:
      return { ...state, students: payload };
    default:
      return state;
  }
};

export const selectedStudentsReducer = (state = {}, { type, payload }) => {
//   console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_STUDENT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const classesReducer = (state = {classes: []}, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_CLASSES:
        return { ...state, classes: payload };
      default:
        return state;
    }
  };

  export const coursesReducer = (state = {courses: []}, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_COURSES:
        return { ...state, courses: payload };
      default:
        return state;
    }
  };