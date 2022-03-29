import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const AddCourse = ({addCourse}) => {
  const [form] = Form.useForm();

  const formItemLayout = {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
  const buttonItemLayout ={
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      
  const onFinish = (values) => {
    addCourse({...values})

    form.setFieldsValue({
      name:"",
      roomNumber:"",
    })
  }      

  const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
  };


  return (
    <Form
      {...formItemLayout}
      form={form}
      style={{
        margin: "30px 0",
        width: "70%"
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item 
        label="Tên môn học" 
        name="name"
        rules={[
          {
            required: true, 
            message: "Vui lòng nhập tên lớp học"
          }
        ]}
      >
        <Input placeholder="Nhập tên lớp học" />
      </Form.Item>
      
      <Form.Item 
        label="Thời gian" 
        name="timeStart"
        rules={[{ required: true, message: "Vui lòng chọn thời gian"}
        ]}
      >
        <Input type="date"/>
      </Form.Item>
      
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddCourse;