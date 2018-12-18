import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'

import ApiService from './services/api.service'
import TokenService from './services/storage.service'

import VeeValidate from 'vee-validate'
import moment from 'moment'

Vue.use( VeeValidate )

Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.config.performance = true

ApiService.init( 'http://localhost:3000/v1/' )

if ( TokenService.getToken() ) {
  ApiService.setHeader()
}

import './assets/css/app.scss'

new Vue( {
  router,
  store,
  render: h => h( App )
} ).$mount( '#app' )
