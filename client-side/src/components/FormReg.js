import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';

const FormReg = ({ addEvent }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
    //Generate random id when the user submits form
    let newdata = { ...values, id: uuidv4() };
    console.log(newdata);
    addEvent(newdata);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='basic'
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      form={form}
    >
      <Form.Item
        label='Event Name'
        name='event_name'
        rules={[
          {
            required: true,
            message: 'Enter the name of Event',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Church Name'
        name='chname'
        rules={[
          {
            required: true,
            message: 'Enter Church Name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Num. Seats'
        name='total_seats'
        rules={[
          {
            required: true,
            message: 'How many seats are available',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Event Date'
        name='date'
        rules={[
          {
            required: true,
            message: 'When is the event',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 18,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormReg;

// const [data, setData] = useState({});

// const handleSubmit = (e) => {
//   e.preventDefault();

//   // return success and error to original state
//   // seterror(false);
//   // setsuccess(false);

//   //Generate random id when the user submits form
//   let newdata = { ...data, id: uuidv4() };
//   addEvent(newdata);
// };

// const handleChange = (e) => {
//   const name = e.target.name;
//   const value = e.target.value;

//   //Create an object for the current input field
//   const currentInputFieldData = {
//     [name]: value,
//   };

//   //Merge the data object with the current input field data object
//   const updatedData = {
//     ...data,
//     ...currentInputFieldData,
//   };
//   setData(updatedData);
//   console.log(data);
// };
