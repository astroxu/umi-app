import { fetchGql } from '@/utils/fetch';

export interface loginInfo {
  email: string;
  passwd: string;
}

export async function login({ email, passwd }:  loginInfo) {
  let obj = {
    query: `
      mutation upsertOneUser(
        $where: UserWhereUniqueInput!
        $create: UserCreateInput!
        $update: UserUpdateInput!
      ) {
        upsertOneUser(where: $where, create: $create, update: $update) {
         id
         name
        }
      }
      `,
    variables: {
      where: {
        email: email,
      },
      create: {
        email: email,
        name: 'defaultName',
        mobile: '123456',
        profile: {
          create: {
            password: passwd,
          },
        },
      },
      update: {
        profile: {
          upsert: {
            update: {
              password: passwd,
            },
            create: {
              password: passwd,
            },
          },
        },
      },
    },
    operationName: 'upsertOneUser',
  };

  return fetchGql(obj);
}
