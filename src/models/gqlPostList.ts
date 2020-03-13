import { postList } from '@/services/post';
import { AnyAction, Reducer } from 'redux';
import { message } from 'antd';
export default {
  namespace: 'gqlPostList', // 默认与文件名相同
  state: {
    posts: [],
    pageConf: {
      pageNum: 0,
      skip: 0,
      first: 20,
      pageSize: 3,
    },
  },

  subscriptions: {
    setup({ dispatch, history }:any) {  // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
      dispatch({
        type: 'getPostsEffect',
        payload:{},
      });
    },
  },
  effects: {
    *getPostsEffect({ type, payload }: any, { put, call, select }: any) {
      let res;
      try {
        res = yield call(postList, payload);
      } catch (e) {
        message.error('博文列表失败');
      }

      yield put({
        type: 'queryList',
        payload: Array.isArray(res.data['posts']) ? res.data['posts'] : [],
      });
    },
  },
  reducers: {
    queryList(state: any, action: AnyAction) {
      return {
        ...state,
        posts: action.payload,
      };
    },
  },
};
