import React from 'react';
import styles from './gql.less';
import { connect, useDispatch, Link } from 'umi';
import { Button } from 'antd';

const categories = {
  query: `{
    categories{
      name
    }
  }`,
};

const upsertOneCategory = {
  query: `mutation addCategory($create: CategoryCreateInput!,$update:CategoryUpdateInput!$where:CategoryWhereUniqueInput!) {
    upsertOneCategory(create:$create,update:$update,where:$where) {
      name
    }
  }
  `,
  variables: {
    create: { name: '时政' },
    update: { name: '时政' },
    where: { name: '时政' },
  },
};

function CountPage({ gqlUpsertOneCategory, gqlCategories }: any) {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        onClick={() =>
          dispatch({
            type: 'gqlUpsertOneCategory/upsertOneCategoryEffect',
            payload: upsertOneCategory,
          })
        }
      >
        点击我试试变更数据
      </Button>
      <h1 className={styles.title}>{JSON.stringify(gqlUpsertOneCategory)}</h1>

      <Button
        onClick={() =>
          dispatch({
            type: 'gqlCategories/categoriesEffect',
            payload: categories,
          })
        }
      >
        获取后端数据
      </Button>
      <h1 className={styles.title}>{JSON.stringify(gqlCategories)}</h1>
      <div>
        <Link to="/">返回主页</Link>
      </div>
    </>
  );
}

export default connect(({ gqlUpsertOneCategory, gqlCategories }: any) => ({
  gqlUpsertOneCategory,
  gqlCategories,
}))(CountPage);
