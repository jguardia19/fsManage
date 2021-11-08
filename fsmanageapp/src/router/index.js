import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const router = new Router({
  mode:'history',
  routes: [
    // {
    //   path: '*',
    //   redirect: '/',
    //   name:'login',
    //   component: () => import('../view/Login.vue')
    //  },
    {
      path:'/',
      name:'login',
      meta:{
        layout : 'login-layout'
      },
      component: () => import('../view/Login.vue')
    },
    {
        path:'/home',
        name:'home',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/Home.vue')
      },
      {
        path:'/admin/typeUsers',
        name:'typeUsers',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/admin/TypeUsers.vue')
      },
      {
        path:'/admin/categorys',
        name:'categorys',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/admin/Categorys.vue')
      },
      {
        path:'/admin/status',
        name:'status',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/admin/Status.vue')
      },
      {
        path:'/admin/users',
        name:'users',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/admin/Users.vue')
      }
   
  ]
  
})

router.beforeEach((to, from, next) => {

  let autenticado = sessionStorage.getItem('autenticado')

  let autorizacion = to.matched.some(record => record.meta.auth)

    if (autorizacion && !autenticado) {
        next('/');
    }
    else {
        next();
    }

});

export default router;
