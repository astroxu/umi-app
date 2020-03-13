import { postAdd, getCategories } from '@/services/post';
import { AnyAction, Reducer } from 'redux';
import { history , useDispatch} from 'umi';
import { message, Select } from 'antd';
import { fetchGql } from '@/services';

export default {
  namespace: 'gqlPostAdd', // 默认与文件名相同
  state: {
    switchOptions: [],
    selectedItems: [],
    selectedCate: [],
    title: '',
    content: '',
    status: false,
    authorId: '',
    categories: [],
  },

  subscriptions: {
    setup({ dispatch, history }: any) {
      // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
      let postId = history.location.pathname.substring(
        history.location.pathname.lastIndexOf('/') + 1,
      );
      dispatch({
        type: 'categoriesEffect',
        payload: {},
      });
    },
  },

  effects: {
    *addPostEffect({ type,dispatch, payload }: any, { put, call, select }: any) {
      let cc = payload.categories
        .toString()
        .split(',')
        .map((e: any) => ({ id: e }));
      payload.categories = cc;
      let res;
      try {
        res = yield call(postAdd, payload);
        message.success('发布成功');
        history.push({ pathname: '/post' });
        yield put({
          type: 'gqlPostList/getPostsEffect',
          payload:{skip:0,first:100}
        });
      } catch (e) {
        message.error('发布失败');
      }
    },
    *categoriesEffect({ type, payload }: any, { put, call, select }: any) {
      let ret;
      try {
        ret = yield call(getCategories, payload);
      } catch (e) {
        message.error('分类获取失败');
      }

      yield put({ type: 'categories', payload: ret.data['categories'] });
    },
  },
  reducers: {
    categories(state: any, action: AnyAction) {
      return {
        categories: action.payload,
      };
    },
  },
};
