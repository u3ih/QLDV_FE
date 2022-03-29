import { useState, useEffect } from 'react'
import { getClass } from '../fetch_api/ClassAPI'
import { getCourse, delCourse, getCourseWithStudents} from '../fetch_api/CourseAPI'
import { getStudent } from '../fetch_api/StudentAPI'
import { Form, Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setClasses } from '../features/actions/classActions'
import { setCourses } from '../features/actions/courseActions'
import { setStudents } from '../features/actions/studentActions'


function ClassTable() {
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const dataCourses = useSelector(state => state.allCourses.courses)
    const dataStudents = useSelector(state => state.allStudents.students)

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const respClass = await getClass();
        dispatch(setClasses(respClass))
        const respCourses = await getCourse();
        dispatch(setCourses(respCourses))
        setData(respCourses)
        const respStudent = await getStudent();
        dispatch(setStudents(respStudent))
    }
  // console.log(data)
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {

      async function fetchData() {
        const respone = await getCourseWithStudents();
        // console.log(respone)
        respone.map(value => {
          value.countStudent = value?.students?.length;
        })
        setData(respone)
      }

      fetchData()

    }, [dataCourses, dataStudents])

      const handleDelete = async (id, e) => {
        try {
          let newData = dataCourses.filter((item) => item?.id !== id)
          await delCourse(id)
          dispatch(setCourses(newData))
        } catch (errInfo){
          alert("failure")
          console.log('Validate Failed:', errInfo);
        }
      }

      // console.log(dataCourses)

    const columns = [
        {title: "Tên lớp", dataIndex: "name", key:"name", editable: true},
        {title: "Phòng", dataIndex: "roomNumber", key:"roomNumber", editable: true},
        {title: "Số sinh viên", dataIndex: "countStudent", key:"countStudent", editable: true},
        {title: "Thời gian", dataIndex: "timeStart", key:"timeStart", editable: true},
        {
            title: 'Xóa Lớp',
            dataIndex: '',
            key: '+',
            render: (text, record) => (
              <span
                className='delete'
                style={{
                    cursor: "pointer",
                    border: "1px solid gray",
                    padding: "5px"
                }}
                onClick={(e) => handleDelete(record.id, e)}
              >
                Delete
              </span>
            ),
          },
    ]

    return (
            <Form form={form} component={false}>
                <Table
                    rowKey={'id'}
                    columns={columns}
                    dataSource={data}
                    style={{width: "100%"}}
                    expandable={{
                      expandedRowRender: record => (record.students.map(value => (
                        <p style={{ margin: 0 }} key={value.id}>{value.name}-{value.codeStudent}</p>
                      ))),
                      rowExpandable: record => record?.students,
                    }}
                />
            </Form>
    )
}

export default ClassTable;