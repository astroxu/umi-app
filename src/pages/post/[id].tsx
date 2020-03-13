import React from 'react';
import styles from '@/global.less';
import { history, connect, useDispatch, Link } from 'umi';
import {
  PageHeader,
  List,
  Tag,
  Typography,
  Button,
  Comment,
  Form,
  Input,
  Avatar,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import gqlPost from '@/models/gqlPost';

const { TextArea } = Input;
const { Paragraph } = Typography;

function PostPage({ gqlPost, ...props }: any) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formRef = React.createRef();
  console.log("gqlPost:"+JSON.stringify(gqlPost));
  return (
    <>
      <div className={styles.postsDiv}>
        {gqlPost.post.author && (
          <>
            <PageHeader
              title={gqlPost.post.title}
              className="site-page-header"
              //subTitle="This is a subtitle"
              tags={
                <div>
                  {gqlPost.post.category &&
                    gqlPost.post.category.map((item: any, key: any) => (
                      <Tag color="blue" key={key}>
                        {item.name}
                      </Tag>
                    ))}
                </div>
              }
            >
              <div>
                <Avatar>{gqlPost.post.author.name}</Avatar>
              </div>
              <div className="content">
                <Paragraph>{gqlPost.post.content}</Paragraph>
              </div>
            </PageHeader>
            <div>
              {gqlPost.post.comment.length > 0 && (
                <List
                  className="comment-list"
                  header={`${gqlPost.post.comment.length} replies`}
                  itemLayout="horizontal"
                  dataSource={gqlPost.post.comment}
                  renderItem={(item: any) => (
                    <li>
                      <Comment
                        author={item.speaker.name}
                        avatar={item.avatar}
                        content={item.speak}
                        //datetime={item.datetime}
                      />
                    </li>
                  )}
                />
              )}
              <Comment
                author={gqlPost.post.comment.author}
                avatar={
                  <Avatar
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {gqlPost.post.comment.author}
                  </Avatar>
                }
                content={
                  <>
                    <Form
                      ref={formRef}
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={values => {
                        values.postId = gqlPost.post.id;
                        const user = localStorage.getItem('userInfo');
                        if (user) {
                          values.speakerId = JSON.parse(user).id;
                        }
                        /* dispatch({
                          type: 'gqlPost/setSubmitting'
                        });*/

                        dispatch({
                          type: 'gqlPost/addCommentEffect',
                          payload: values,
                        });
                        formRef.current.resetFields();
                      }}
                      onFinishFailed={errorInfo =>
                        console.log('Failed:', errorInfo)
                      }
                    >
                      <Form.Item
                        name="speak"
                        rules={[
                          { required: true, message: '评论内容不能为空' },
                        ]}
                      >
                        <TextArea rows={4} value={gqlPost.speak} />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={gqlPost.submitting}
                        >
                          Add Comment
                        </Button>
                      </Form.Item>
                    </Form>
                  </>
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default connect(({ gqlPost }: any) => ({
  gqlPost,
}))(PostPage);
