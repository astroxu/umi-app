import { fetchGql } from '@/utils/fetch';

export interface postListInfo {
  skip: number;
  first: number;
}

export interface postAddInfo {
  title: string;
  content: string;
  status: false;
  authorId: string;
  categories: [];
}

export interface commentAddInfo {
  speak: string;
  speakerId: string;
  postId: string;
}

export async function postList({ skip, first }: postListInfo) {
  let obj = {
    query: `
      query posts($orderBy: PostOrderByInput, $skip: Int, $first: Int) {
        posts(orderBy: $orderBy, skip: $skip, first: $first) {
          id
          title
          content
          status
          author {
            name
          }
        }
      }
    `,
    variables: {
      orderBy: {
        id: 'asc',
      },
      skip: skip,
      first: first,
    },
    operationName: 'posts',
  };

  return fetchGql(obj);
}

export async function postDetail(id: string) {
  let obj = {
    query: `
      query post($where: PostWhereUniqueInput!) {
         post(where: $where) {
            id
            author {
              id
              name
            }
            title
            content
            status
            category {
              id
              name
            }
            comment {
              id
              speaker {
                id
                name
              }
              speak
            }
          }
      }
    `,
    variables: {
      where: {
        id: id,
      },
    },
    operationName: 'post',
  };

  return fetchGql(obj);
}

export async function postAdd({
  title,
  content,
  status,
  authorId,
  categories,
}: postAddInfo) {
  let obj = {
    query: `
        mutation createOnePost($data: PostCreateInput!) {
          createOnePost(data: $data) {
            id
          }
        }
      `,
    variables: {
      data: {
        title: title,
        content: content,
        status: status,
        author: {
          connect: {
            id: authorId,
          },
        },
        category: {
          connect: categories,
        },
      },
    },
    operationName: 'createOnePost',
  };

  return fetchGql(obj);
}

export async function getCategories() {
  let obj = {
    query: `
      {
        categories(orderBy: {id: asc}) {
          name
          id
        }
      }
    `,
    variables: {},
    operationName: '',
  };

  return fetchGql(obj);
}

export async function addComment({ speak, speakerId, postId }: commentAddInfo) {
  let obj = {
    query: `
      mutation createOneComment($data: CommentCreateInput!) {
        createOneComment(data: $data) {
          id
        }
      }
    `,
    variables: {
      data: {
        speak: speak,
        speaker: {
          connect: {
            id: speakerId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    },
    operationName: 'createOneComment',
  };

  return fetchGql(obj);
}
