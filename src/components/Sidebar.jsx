import { UploadOutlined, UserOutlined, ContactsOutlined, ProfileOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'

const { Sider } = Layout

const Sidebar = () => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
            console.log(broken);
            }}
        >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">
              <span>DashBoard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ContactsOutlined />}>
            <Link to="/students">
                <span>Student</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to="/courses">
                <span>Course</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to="/classes">
                <span>Config Class</span>
            </Link>
          </Menu.Item>
          
        </Menu>
      </Sider>
    )
}

export default Sidebar