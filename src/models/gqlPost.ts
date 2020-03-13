import { addComment, postDetail } from '@/services/post';
import { AnyAction, Reducer } from 'redux';
export default {
  namespace: 'gqlPost', // 默认与文件名相同
  state: {
    post: {
      id: '',
      title: '',
      content: '',
      status: false,
      author: {
        id: '',
        name: '',
      },
      category: [],
      comment: [],
    },
    speak: '',
    submitting: false,
  },

  subscriptions: {
    setup({ dispatch, history }: any) {
      // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
      let postId = history.location.pathname.substring(history.location.pathname.lastIndexOf('/')+1);

      /*document.addEventListener('readystatechange', e => {
        if (document.readyState == "complete"){
          dispatch({
            type: 'getPost',
            payload: postId,
          });
        }
      });*/
      dispatch({
        type: 'getPostEffect',
        payload: postId,
      });
    },
  },
  effects: {
    *addCommentEffect({ type, payload }: any, { put, call, select }: any) {
      let res;
      try {
        res = yield call(addComment, payload);

        res = yield call(postDetail, payload['postId']);
      } catch (e) {
        alert(e.message);
      };
      yield put({
        type: 'queryPost',
        payload: res.data['post'] ? res.data['post'] : {},
      });
    },
    *getPostEffect({ type, payload }: any, { put, call, select }: any) {
      let res;
      try {
        res = yield call(postDetail, payload);
      } catch (e) {
        alert(e.message);
      }

      yield put({
        type: 'queryPost',
        payload: res.data['post'] ? res.data['post'] : {},
      });
    },
  },
  reducers: {
    queryPost(state: any, action: AnyAction) {
      return {
        speak:'',
        post: action.payload,
        submitting:false
      };
    },
    setSubmitting(state: any, action: AnyAction) {
      return {
        ...state,
        speak:'',
        submitting:true
      };
    },
  },
};
