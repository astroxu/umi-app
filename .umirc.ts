import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    immer: true,
    hmr: true,
  },
  routes: [
    //{ exact: true, path: '/login', component: '@/pages/login' },
    {
      path: '/',
      /*component: '@/layouts/index',*/
      routes: [
        { path: '/', component: '@/pages/login' },
        {
          component: '@/layouts/index',
          path: '/post',
          routes: [
            { exact: true, path: '/post', component: '@/pages/post/list' },
            { title:'发布博文',exact: true, path: '/post/add', component: '@/pages/post/add' },
            { exact: true, path: '/post/:id', component: '@/pages/post/[id]' },
          ],
        },
      ],
    }
  ],
  base: '/blog_xucg/',
  publicPath: '/blog_xucg/',
});
