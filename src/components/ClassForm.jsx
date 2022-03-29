import { useState, useEffect } from 'react'
import { Button, Layout, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getStudent, updateStudent } from '../fetch_api/StudentAPI'
import { getCourse, updateCourse } from '../fetch_api/CourseAPI'
import { getClass } from '../fetch_api/ClassAPI'
import { setClasses } from '../features/actions/classActions'
import { setCourses } from '../features/actions/courseActions'
import { setStudents } from '../features/actions/studentActions'

const { Option } = Select;

function ClassForm() {
    const [roomClassByCourse, setRoomClassByCourse] = useState();
    const [idStudent, setIdStudent] = useState();
    const [idClass, setIdClass] = useState();
    const [idCourse, setIdCourse] = useState();

    const [showStudents, setShowStudents] = useState([])

    const dataCourses = useSelector(state => state.allCourses.courses)
    const dataClasses = useSelector(state => state.allClasses.classes)
    const dataStudents = useSelector(state => state.allStudents.students)
    const dispatch = useDispatch();

    const fetchData = async () => {
        const respStudent = await getStudent();
        dispatch(setStudents(respStudent))
        const respCourses = await getCourse();
        dispatch(setCourses(respCourses))
        const respClasses = await getClass();
        dispatch(setClasses(respClasses))
        setShowStudents(dataStudents)
    }

    // console.log(dataStudent)

    useEffect(() => {
        fetchData()
    }, [])

    // const handleAddClass = async ({name, roomNumber}) => {
    //     let classes = {
    //       name,
    //       roomNumber
    //     }
    // }

    function onChangeStudent(id) {
        setIdStudent(id)
    }

    function onSearchStudent(val) {
    }

    const onChangeCourses = (id) => {
        setIdCourse(id)
        let course = dataCourses.find(item => item.id === id)
        if(course?.idClass) {
            const cla = dataClasses.find(i => i.id === course.idClass)
            setRoomClassByCourse(cla.roomNumber)
        } else {
            setRoomClassByCourse()
        }

        let listStudent = [];

        dataStudents.forEach(student => {
            let s
            if(student.courseId) {
                s = student;
            }
            if(s) {
                listStudent.push(s);
            }
        })

        let newListStudent = dataStudents
        console.log(listStudent)
        let result = newListStudent.filter(student => !listStudent.some(item => item.id === student.id))

        setShowStudents(result)
    }

    const onSearchCourses = (val) => {
    }

    const onChangeClasses = (id) => {
        setIdClass(id)
    }

    const onSearchClasses = (val) => {
    }

    const handleAddClassStudent = () => {
        let course = dataCourses.find(item => item.id === idCourse)
        course.countStudent++;

        if(idClass) {
            course = {...course, idClass}
        } 

        let newDataCourse = dataCourses.map(item => {
    
            if (item.id === idCourse) {
                course.countStudent = course?.students?.length || 0;
                return course
            }
            item.countStudent = item?.students?.length || 0;
            return item
        })

        console.log(course)

        dispatch(setCourses(newDataCourse))
        
        let student = dataStudents.find(item => item.id === idStudent)
        student['courseId'] = idCourse;
        
        let newDataStudent = dataStudents.map(item => {
            // console.log(item)

            if (item.id === idStudent) {
                course.countStudent = course?.students?.length || 0;
                return course
            }
            return item
        })

        dispatch(setStudents(newDataStudent))

        updateStudent(idStudent, student)
        updateCourse(idCourse, course)

        alert("success")
    }

    return (
        <Layout
            style={{
                alignItems: "center"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                    margin: "10px 0"
                }}
            >
                <span>Chọn môn học:</span>
                <Select
                    showSearch
                    placeholder="Select a course"
                    optionFilterProp="children"
                    onChange={onChangeCourses}
                    onSearch={onSearchCourses}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    {dataCourses.map(course => (
                        <Option value={course.id} key={course.id}>{course.name}</Option>
                    ))}
                    
                </Select>

                <span>Chọn phòng học:</span>
                <Select
                    showSearch
                    placeholder="Select a room number"
                    optionFilterProp="children"
                    onChange={onChangeClasses}
                    onSearch={onSearchClasses}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{
                        marginBottom: "10px"
                    }}
                    disabled={roomClassByCourse ? true : false}
                    value={roomClassByCourse}
                    
                >
                    {!roomClassByCourse && dataClasses.map(cla => (
                        <Option value={cla.id} key={cla.id}>{cla.roomNumber}</Option>
                    ))}
                    
                </Select>

                <span>Chọn sinh viên:</span>
                <Select
                    showSearch
                    placeholder="Select a student"
                    optionFilterProp="children"
                    onChange={onChangeStudent}
                    onSearch={onSearchStudent}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    
                >
                    {showStudents.map(student => (
                        <Option value={student.id} key={student.id}>{student.name}</Option>
                    ))}
                    
                </Select>
                
            </div>

            <Button
                disabled={idCourse && idStudent && (idClass || roomClassByCourse) ? false : true}
                onClick={handleAddClassStudent}
            >
                Ghép lớp học
            </Button>
        </Layout>
    )
}

export default ClassForm;