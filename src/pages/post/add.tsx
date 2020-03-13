import React from 'react';
import styles from '@/global.less'
import { history, connect, Link,useDispatch } from 'umi';
import { List,Input, Select,Switch,Form,Typography, Button } from 'antd';

const { Title } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

function PostAddPage({ gqlPostAdd }: any) {

  const children = [];
  for (let i = 0; i < gqlPostAdd.categories.length; i++) {
    children.push(
      <Select.Option key={gqlPostAdd.categories[i].id}>
        {gqlPostAdd.categories[i].name}
      </Select.Option>
    );
  }

  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.postsDiv}>
      <Title className={styles.postAddTitle}>发布博文</Title>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values:any) =>{
          const user = localStorage.getItem('userInfo');
          if (user) {
            values.authorId = JSON.parse(user).id;
          }
          dispatch({
            type: 'gqlPostAdd/addPostEffect',
            payload: values,
          })

        }

        }
        onFinishFailed={(errorInfo:any) => console.log('Failed:', errorInfo)}
      >
        <Form.Item
          label="标题"
          name='title'
          rules={[{ required: true }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="分类"
          name='categories'
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            onChange={
              values =>{
                values.toString().split(",").map((e:any)=>({id:e}))
              }
            }
            style={{ width: '100%' }}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item
          label="内容"
          name='content'
          rules={[{ required: true }]}
        >
          <Input.TextArea  rows={4} />
        </Form.Item>
        <Form.Item
          label="状态"
          name='status'
        >
          <Switch />
        </Form.Item>
        <Form.Item  {...tailLayout}>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  );
}

export default connect(({ gqlPostAdd }: any) => ({
  gqlPostAdd,
}))(PostAddPage);
