import axios from 'axios';

export const delCourse = async (id) => {
  const respone = await axios.delete(`${process.env.REACT_APP_API_COURSE_URL}/${id}`)
  return respone
}

export const updateCourse = (id, data) => {
  return axios.put(`${process.env.REACT_APP_API_COURSE_URL}/${id}`, data)
}

export const addCourse = async (data) => {
  const newData = await axios.post(`${process.env.REACT_APP_API_COURSE_URL}`, data)
  return newData
}

export const getCourse = async () => {
  const respone = await axios.get(`${process.env.REACT_APP_API_COURSE_URL}`)
  let data = respone.data;
  return data
}

export const getCourseWithStudents = async () => {
  let respone = await axios.get(`${process.env.REACT_APP_API_COURSE_URL}/with/students`)
  let data = respone.data
  return data
}
