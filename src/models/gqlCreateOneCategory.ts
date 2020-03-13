import { fetchGql } from '@/services';
import { message } from 'antd';

export default {
  namespace: 'gqlUpsertOneCategory', // 默认与文件名相同
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
    upsertOneCategory(state: any, { payload }: any) {
      return Object.assign(state, payload);
    },
  },
  effects: {
    *upsertOneCategoryEffect({ type, payload }: any, { put, call, select }: any) {
      let ret;
      try {
        ret = yield call(fetchGql, payload);
      } catch (e) {
        message.error('uosert分类失败');
      }
      yield put({ type: 'upsertOneCategory', payload: ret.data['upsertOneCategory'] });
    },
  },
}
