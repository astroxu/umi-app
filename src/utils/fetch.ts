import { request } from 'umi';

export const BackendUrl =
  'https://service-5ixybmdh-1257983906.sh.apigw.tencentcs.com';

interface GqlParms {
  query: string;
  variables: any;
  operationName: string;
}

export async function fetchGql(params: GqlParms) {
  return request.post(BackendUrl, { mode:'cors',method: 'post', data: params });
}
