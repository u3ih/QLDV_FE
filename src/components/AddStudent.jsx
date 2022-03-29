import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';

const { Option } = Select;

const AddStudent = ({addStudent}) => {
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
      
  const onFinish = async (values) => {
    if(await addStudent({...values, age: parseInt(values.age)})) {

      form.setFieldsValue({
        name:"",
        codeStudent:"",
        age:"",
        address:"",
        description:"",
        gender: ""
      })
    }
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
        label="Tên sinh viên" 
        name="name"
        rules={[
          {
            required: true, 
            message: "Vui lòng nhập tên"
          }
        ]}
      >
        <Input placeholder="Nhập tên sinh viên" />
      </Form.Item>
      <Form.Item 
        label="Mã sinh viên" 
        name="codeStudent"
        rules={[
          { required: true, message: "Vui lòng nhập mã sinh viên",},
          { pattern: '^SV[0-9][0-9]?$', message: "Mã sinh viên dạng SV[0-9][0-9]?",}
        ]}
      >
        <Input placeholder="Nhập mã sinh viên" />
      </Form.Item>
      <Form.Item 
        label="Tuổi" 
        name="age"
        rules={[
          { required: true, message: "Vui lòng nhập tuổi"},
          {
            validator(rule, value, callback) {
              if (value > 200 || value < 0) {
                callback('Phải lớn hơn 0 và nhỏ hơn 200')
              }
              callback();
            }
          }
        ]}
      >
        <InputNumber placeholder="Nhập tuổi" />
      </Form.Item>
      <Form.Item 
        label="Địa chỉ" 
        name="address"
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Giới tính"
        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
      >
        <Select placeholder="select your gender">
          <Option value="Nam">Nam</Option>
          <Option value="Nữ">Nữ</Option>
          <Option value="Khác">Khác</Option>
        </Select>
      </Form.Item>

      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddStudent;