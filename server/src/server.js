import '@babel/polyfill'
import app from './app'

const CONFIG = require( './config/config' )

app.listen( CONFIG.port, () => {
    console.log( 'App started' )// eslint-disable-line
} )
