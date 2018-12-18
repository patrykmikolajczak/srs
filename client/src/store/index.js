import Vue from 'vue'
import Vuex from 'vuex'

const requireModule = require.context( '.', false, /\.module\.js$/ )
const modules = {}

Vue.use( Vuex )

requireModule.keys().map( fileName => {
    const moduleName = fileName.replace( /(\.\/|\.module\.js)/g, '' )
    modules[ moduleName ] = requireModule( fileName ).default
} )

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store( {
    modules,
    strict: debug
} )
