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
      },
      {
        path:'/categorys',
        name:'categorys',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/Categorys.vue')
      },
      {
        path:'/proveedores',
        name:'proveedores',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/Proveedores.vue')
      },
      {
        path:'/clientes',
        name:'clientes',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/Clientes.vue')
      },
      {
        path:'/productos',
        name:'productos',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/Productos.vue')
      },
      {
        path:'/producto/create',
        name:'productosCreate',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/CreateProducto.vue')
      },
      {
        path:'/ventas',
        name:'ventas',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/Ventas.vue')
      },
      {
        path:'/ventas/create',
        name:'ventas/create',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/CreateVenta.vue')
      },
      {
        path:'/gastos',
        name:'Gastos',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/Gastos.vue')
      },
      {
        path:'/cuentasPagar',
        name:'cuentasPagar',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/CuentasPagar.vue')
      },
      {
        path:'/cuentasCobrar',
        name:'cuentasCobrar',
        meta:{
          layout : 'dasboard-layout'
        },
        component: () => import('../view/CuentasCobrar.vue')
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
