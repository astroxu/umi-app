import { request } from 'umi';

export const backend = 'https://service-5ixybmdh-1257983906.sh.apigw.tencentcs.com'; // learning

export const fetchGql = async (data: any) => await request(backend, { method: 'post', data });

export const gqlState = (gqlApi: string, model: any) => Object.assign({
  // 命名空间为:gql+Api的名字（api的首字母大写）
  namespace: `gql${gqlApi.replace(gqlApi[0], gqlApi[0].toUpperCase())}`,
  effects: {
    *[gqlApi + "Effect"]({ type, payload }: any, { put, call, select }: any) {
      let ret;
      try {
        ret = yield call(fetchGql, payload);
      } catch (e) {
        alert(`访问gqlApi出错：${e.message}`);
      }
      yield put({ type: gqlApi, payload: ret.data[payload] })
    },
  },
  reducers: {
    [gqlApi](state: any, { payload }: any) {
      alert(`请在reducers里写一个同名的函数来覆盖本函数：${gqlApi}`);
    }
  }
}, model)

