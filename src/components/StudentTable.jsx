import { Form, Table, InputNumber, Input, Typography, Popconfirm } from 'antd'
import { useState, useEffect } from 'react'
import { getStudent, updateStudent, delStudent, getStudentWithCourse} from '../fetch_api/StudentAPI'
import { getCourse } from '../fetch_api/CourseAPI'
import { setStudents } from '../features/actions/studentActions'
import { useSelector, useDispatch } from 'react-redux'
import { setCourses } from '../features/actions/courseActions'

const StudentTable = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [editingKey, setEditingKey] = useState('')
    const [listStudentWithCourse, setListStudentWithCourse] = useState([])

    const dataStudents = useSelector(state => state.allStudents.students)
    const dataCourses = useSelector(state => state.allCourses.courses)

    const fetchStudents = async () => {
      const resp = await getStudent();
      dispatch(setStudents(resp))
      const respCourses = await getCourse();
      dispatch(setCourses(respCourses))
    }
    // console.log(dataCourses)

    useEffect(() => {
      fetchStudents()
    }, [])

    // console.log(process.env)

    useEffect(() => {

      async function fetchData() {
        const respone = await getStudentWithCourse();
      // console.log(respone)
        setListStudentWithCourse(respone)
      }

      fetchData()

    }, [dataCourses, dataStudents])

    const isEditing = (record) => record.id === editingKey;

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      };

    const edit = (record) => {
        form.setFieldsValue({
          name: '',
          codeStudent: '',
          gender: '',
          age: '',
          address: '',
          description: '',
          ...record,
        });
        setEditingKey(record.id);
      };
      const cancel = () => {
        setEditingKey('');
      };
    
      const handleDelete = async (id, e) => {
        try {
          let newData = dataStudents.filter((item) => item?.id !== id)
          dispatch(setStudents(newData))
          delStudent(id)
        } catch (errInfo){
          alert("failure")
          console.log('Validate Failed:', errInfo);
        }
      }

      const save = async (idPass) => {
        try {
          const row = await form.validateFields();
          const newData = [...dataStudents];
          const index = newData.findIndex((item) => idPass === item.id);
          const item = newData[index];
    
          if (index > -1) {
            newData.splice(index, 1, { ...item, ...row });
          } else {
            newData.push(row); 
          }
          setEditingKey('');
          let {id, ...dataUpdate} = { ...item, ...row }
          const respone = await updateStudent(idPass, dataUpdate);
          // console.log(respone);

          dispatch(setStudents(newData))

        } catch (errInfo) {
          console.log(errInfo);
        }
    };

    // console.log(dataStudents)

    const columns = [
            { title: 'Tên', dataIndex: 'name', key: 'name', editable: true },
            { title: 'Mã sinh viên', dataIndex: 'codeStudent', key: 'codeStudent', editable: true },
            { title: 'Giới tính',
              dataIndex: 'gender', 
              key: 'gender', 
              editable: true,
              filters: [
                {
                  text: 'Nam',
                  value: 'Nam'
                },
                {
                  text: 'Nữ',
                  value: 'Nữ'
                }
              ],
              onFilter: (value, record) => record.gender.indexOf(value) === 0
            },
            { title: 'Tuổi',
              dataIndex: 'age', 
              key: 'age', 
              editable: true,
              sorter: (a,b) => a.age - b.age
            },
            { title: 'Địa chỉ', 
              dataIndex: 'address', 
              key: 'address', 
              editable: true,
              filters: [
                {
                  text: 'Hà Nội',
                  value: 'Hà Nội'
                },
                {
                  text: 'Thái Bình',
                  value: 'Thái Bình'
                }
              ],
              onFilter: (value, record) => {
                return record.address.search(value) !== -1
              }
            },
            {
                title: 'Sửa sinh viên',
                dataIndex: 'operation',
                render: (_, record) => {
                  const editable = isEditing(record);
                  return editable ? (
                    <span>
                      <Typography.Link
                        onClick={() => save(record.id)}
                        style={{
                          marginRight: 8,
                        }}
                      >
                        Save
                      </Typography.Link>
                      <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                  ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                      Edit
                    </Typography.Link>
                  );
                },
            },
            {
              title: 'Xóa sinh viên',
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
        ];   

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
              return col;
            }

            return {
              ...col,
              onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
              }),
            };
        });
    
    return (
        <Form form={form} component={false}>
            <Table
                rowKey={'id'}
                components={{
                    body: {
                    cell: EditableCell,
                    },
                }}
                columns={mergedColumns}
                dataSource={listStudentWithCourse}
                pagination={{
                    onChange: cancel,
                }}
                style={{width: "100%"}}
                expandable={{
                  expandedRowRender: record => {
                      return (
                          <span style={{marginRight: "10px"}}>{record.course.name}</span>
                      )
                  },
                  
                  rowExpandable: record => record?.course,
                }}
            />
        </Form>
    )
}


export default StudentTable;