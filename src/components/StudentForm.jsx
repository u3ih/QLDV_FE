import StudentTable from "./StudentTable";
import AddStudent from "./AddStudent";
import { Button, Layout } from "antd";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStudents } from '../features/actions/studentActions';
import { addStudent } from '../fetch_api/StudentAPI';


const StudentForm = () => {
    const [hidden, setHidden] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector(state => state.allStudents.students)

    const handleShowFormAddStudent = () => {
        setHidden(prev => !prev)
    }

    const handleAddStudent = async ({name, codeStudent, gender, age, address}) => {
        if(data.some(value => value.codeStudent === codeStudent)) {
            alert("Trùng mã sinh viên")
            return false;
        } else {
            try{
                let student = {
                    name,
                    codeStudent,
                    gender,
                    age,
                    address
                }
                const response = await addStudent(student);
                
                console.log(response)
                let newData = [...data, response?.data];
                dispatch(setStudents(newData))
            } catch (e) {
                console.log(e)
            }
            return true;
        }
      }

    return (
        <Layout
            style={{
                alignItems: "center"
            }}
        >
            <StudentTable />
            <Button
                onClick={handleShowFormAddStudent}
            >Thêm sinh viên</Button>
            {hidden && <AddStudent addStudent={handleAddStudent}/>}
        </Layout>
    )
}

export default StudentForm;