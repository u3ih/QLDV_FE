import axios from 'axios';

export const deleteClass = async (id) => {
  const respone = await axios.delete(`${process.env.REACT_APP_API_CLASS_URL}/${id}`)
  return respone
}

export const addClass = async (data) => {
  const newData = await axios.post(`${process.env.REACT_APP_API_CLASS_URL}`, data)
  return newData
}

export const getClass = async () => {
  let respone = await axios.get(`${process.env.REACT_APP_API_CLASS_URL}`)
  let data = respone.data;
  return data
}