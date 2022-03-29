import CourseTable from "./CourseTable";
import AddCourse from "./AddCourse";
import { useState } from 'react'
import { Button, Layout } from 'antd'
import { setCourses } from "../features/actions/courseActions";
import { useSelector, useDispatch } from 'react-redux'
import { addCourse } from '../fetch_api/CourseAPI'

function ClassForm() {
    const [hidden, setHidden] = useState(false)
    const dataCourses = useSelector(state => state.allCourses.courses)
    const dispatch = useDispatch()

    const handleShowFormAddClass = () => {
        setHidden(prev => !prev)
    }

    const handleAddCourse = async ({name, timeStart}) => {
        let course = {
          name,
          timeStart
        }
        const response = await addCourse(course);
        dispatch(setCourses([...dataCourses, response?.data]));
    }

    return (
        <Layout
            style={{
                alignItems: "center"
            }}
        >
            <CourseTable/>
            <Button
                onClick={handleShowFormAddClass}
            >
                Thêm môn học
            </Button>
            { hidden && <AddCourse addCourse={handleAddCourse}/>}
        </Layout>
    )
}

export default ClassForm;