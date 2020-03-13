import { login } from '@/services/login';
import { history } from 'umi';
import { message } from 'antd';

export default {
  namespace: 'gqlLogin', // 默认与文件名相同
  state: {
    email: '',
    passwd: '',
  },
  subscriptions: {},
  reducers: {},
  effects: {
    *loginEffect({ type, payload }: any, { put, call, select }: any) {
      let ret;
      try {
        ret = yield call(login, payload);

        message.success('登陆成功');
        localStorage.setItem('userInfo',JSON.stringify(ret.data['upsertOneUser']));
        history.push({ pathname: '/post' });
      } catch (e) {
        message.error('登陆失败');
      }
    },
  },
};
