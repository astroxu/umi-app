import React from 'react';
//import styles from './gql.less';
import styles from '@/global.less';
import { connect, useDispatch } from 'umi';
import { Form, Typography, Button, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginPage({ gqlLogin }: any) {
  const dispatch = useDispatch();
  return (
    <>
      <Title className={styles.title}>Blog</Title>
      <Form
        className={styles.login}
        {...tailLayout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={values =>
          dispatch({
            type: 'gqlLogin/loginEffect',
            payload: values,
          })
        }
        onFinishFailed={errorInfo => console.log('Failed:', errorInfo)}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="passwd"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button className={styles.loginBtn} type="primary" htmlType="submit">
            login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default connect(({ gqlLogin }: any) => ({
  gqlLogin,
}))(LoginPage);
