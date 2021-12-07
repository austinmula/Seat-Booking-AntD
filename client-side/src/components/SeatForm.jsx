import React from 'react';
import { Form, Input, Button } from 'antd';

const SeatForm = ({ picks, bookSeat }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (picks.length < 2) {
      onFinishFailed('Pick a Seat');
    } else {
      values = { ...values, picks: picks.filter((a) => a !== 0) };
    }
    bookSeat(values);
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
        label='Name'
        name='name'
        rules={[
          {
            required: true,
            message: 'Enter your Name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 18,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Book Seat
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SeatForm;
