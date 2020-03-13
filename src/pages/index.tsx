import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { Link } from 'umi';
export default function({ gqlUpsertOneCategory, gqlCategories }: any) {
  return (
    <>
      <div className={styles.title}>这是首页</div>
      <Button onClick={() => alert('hi')}>ant样式按钮</Button>

      <div>
        <Link to="/gql">去测试gql</Link>
      </div>
    </>
  );
}
