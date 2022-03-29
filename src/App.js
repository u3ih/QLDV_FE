import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/DashBoard.jsx";
import StudentForm from "./components/StudentForm.jsx";
import CourseForm from './components/CourseForm.jsx';
import ClassForm from './components/ClassForm'


const { Content } = Layout;

function App() {
  return (
    <>
        <Content>
          <Router>
            <Layout style={{height: "100vh"}}>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<StudentForm />} />
                <Route path="/classes" element={<ClassForm />} />
                <Route path="/courses" element={<CourseForm />} />
              </Routes>
            </Layout>
          </Router>
        </Content>
    </>
  );
}

export default App;
