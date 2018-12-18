import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'
import TokenService from './services/storage.service'

Vue.use( Router )

const router = new Router( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import( './views/Signin.vue' ),
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import( './views/Signup.vue' ),
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/recover-account',
      name: 'recoverAccount',
      component: () => import( './views/RecoverAccount.vue' ),
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/app',
      name: 'app',
      component: () => import( './views/AppScreen.vue' ),
      children: [
        {
          path: 'list',
          name: 'receipt_list',
          component: () => import( './views/ReceiptList.vue' )
        },
        // {
        //   path: 'profile',
        //   name: 'profile',
        //   component: () => import( './views/Profile.vue' )
        // },
        {
          path: 'add',
          name: 'add_receipt',
          component: () => import( './views/AddReceipt.vue' )
        }
      ]
    }
  ]
} )

router.beforeEach( ( to, from, next ) => {
  const isPublic = to.matched.some( record => record.meta.public )
  const onlyWhenLoggedOut = to.matched.some( record => record.meta.onlyWhenLoggedOut )
  const loggedIn = !!TokenService.getToken()

  if ( !isPublic && !loggedIn ) {
    return next( {
      path: '/signin',
      query: { redirect: to.fullPath }
    } )
  }

  if ( loggedIn && onlyWhenLoggedOut ) {
    return next( '/app/list' )
  }

  next()
} )

export default router
