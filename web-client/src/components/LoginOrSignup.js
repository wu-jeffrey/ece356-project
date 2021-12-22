import { Form, Input, Button, Card, Tabs } from 'antd';

import { useAuth } from '../routing/authContext';

export function LoginOrSignup() {
  const { login } = useAuth();

  const onLogin = ({ email, password }) => {
    (async () => {
      const response = await fetch(`/api/users/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();

      login(data.user, data.token)
    })();
  };

  const onSignup = ({ email, password, confirm_password }) => {
    if (password !== confirm_password) {
      alert("Passwords do not match!")
    } else {
      (async () => {
        const response = await fetch(`/api/users/`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        });

        if (response.status === 200) {
          onLogin({ email, password });
        }
      })();
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Login" key="1">
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Email" name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{
              offset: 8,
              span: 16,
            }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Sign Up" key="2">
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSignup}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Email" name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password"
              rules={[
                {
                  required: true,
                  message: 'Please create a password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label="Confirm Password" name="confirm_password"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{
              offset: 8,
              span: 16,
            }}
            >
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs >
    </Card>
  );
};
