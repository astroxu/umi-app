import { fetchGql } from '@/services';
import { message } from 'antd';

export default {
  namespace: 'gqlCategories', // 默认与文件名相同
  state: {},
  subscriptions: {
    // setup({ dispatch, history }: any) {
    //   window.onresize = () => {
    //     dispatch({ type: "update" })
    //   }
    // },
    // onClick({ dispatch }: any) {
    //   document.addEventListener('click', () => {
    //     dispatch({ type: "update" })
    //   });
    // }
  },
  reducers: {
    categories(state: any, { payload }: any) {
      return Object.assign(state, payload);
    },
  },
  effects: {
    *categoriesEffect({ type, payload }: any, { put, call, select }: any) {
      let ret;
      try {
        ret = yield call(fetchGql, payload);
      } catch (e) {
        message.error('获取分类数据失败');
      }
      yield put({ type: 'categories', payload: ret.data['categories'] });
    },
  },
}
