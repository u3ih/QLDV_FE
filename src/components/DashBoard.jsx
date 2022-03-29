import StudentTable from "./StudentTable"
import { Layout } from 'antd'
import CourseTable from "./CourseTable"

const Dashboard = () => {

    return (
        <Layout
            style={{
                alignItems: "center",
                justifyContent: "start"
            }}
        >
            <h2>Bảng sinh viên</h2>
            <StudentTable />
            <h2>Bảng môn học</h2>
            <CourseTable />
        </Layout>
    )
}

export default Dashboard