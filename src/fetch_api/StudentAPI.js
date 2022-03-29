import axios from 'axios';

export const updateStudent = async (id, data) => {
  try{
    const respone = await axios.put(`${process.env.REACT_APP_API_STUDENT_URL}/${id}`, data)
    return respone;
  } catch (e) {
    return e.response;
  }
}

export const delStudent = async (id) => {
  const respone = await axios.delete(`${process.env.REACT_APP_API_STUDENT_URL}/${id}`)
  return respone
}

export const addStudent = async (data) => {
  try{
    const newData = await axios.post(`${process.env.REACT_APP_API_STUDENT_URL}`, data)
    return newData
  } catch (e){
    return e.response;
  }
}

export const getStudent = async () => {
  const resp = await axios.get(`${process.env.REACT_APP_API_STUDENT_URL}`)
  const data = resp.data
  return data
}

export const getStudentById = async (id) => {
  const resp = await axios.get(`${process.env.REACT_APP_API_STUDENT_URL}/${id}`)
  const data = resp.data
  return data
}

export const getCourseByIdStudent = async (id) => {
  const resp = await axios.get(`${process.env.REACT_APP_API_STUDENT_URL}/${id}/course`)
  const data = resp.data
  return data
}

export const getStudentWithCourse = async () => {
  const resp = await axios.get(`${process.env.REACT_APP_API_STUDENT_URL}/with/course`)
  const data = resp.data
  return data
}