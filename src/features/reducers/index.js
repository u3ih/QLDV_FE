import { combineReducers } from "redux";
import { studentsReducer, classesReducer, coursesReducer } from "./Reducer";
const reducers = combineReducers({
  allStudents: studentsReducer,
  allClasses: classesReducer,
  allCourses: coursesReducer
});
export default reducers;