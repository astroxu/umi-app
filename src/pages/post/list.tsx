import React from 'react';
import styles from '@/global.less'
import { history, connect, Link, useDispatch } from 'umi';
import { Avatar,List, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Layout from '@/layouts/index'

const { Title } = Typography;

function PostListPage({ gqlPostList, ...props }: any) {
  const dispatch = useDispatch();
  return (
    <>
      {/*<Layout>*/}
      <div className={styles.postsDiv}>
        <Title className={styles.postsTitle}>博文列表</Title>
        <Button
          className={styles.postsBtn}
          type="primary"
          onClick={() => history.push({ pathname: '/post/add' })}
        >
          发布博文
        </Button>
        <List
          itemLayout="vertical"
          size="default"
          pagination={{
            onChange: page => {
              gqlPostList.pageConf.skip = 0;
              gqlPostList.pageConf.first = 10;
            },
            pageSize: gqlPostList.pageConf.pageSize,
          }}
          dataSource={gqlPostList.posts}
          renderItem={(item: any) => (
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                }
                title={item.author.name}

                description={<Link to={{ pathname: `/post/${item.id}` }}
                                   onClick={values => {
                  dispatch({
                    type: 'gqlPost/getPostEffect',
                    payload: item.id,
                  });
                }}
                >
                  {item.title}
                </Link>}
              />
            </List.Item>
          )}
        />
      </div>
     {/* </Layout>*/}
    </>
  );
}

export default connect(({ gqlPostList }: any) => ({
  gqlPostList,
}))(PostListPage);
