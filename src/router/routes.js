//路由配置信息
export default [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: { show: true },
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/pay") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'center',
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: () => import('@/pages/Center/MyOrder')
            },
            {
                name: 'group',
                path: 'group',
                component: () => import('@/pages/Center/Group')
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    //重定向，访问/立马回到首页
    {
        path: '*',
        redirect: '/home'
    }
]