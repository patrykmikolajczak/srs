import { UserService, AuthenticationError } from '../services/user.service'
import TokenService from '../services/storage.service'
import router from '../router'

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationError: '',
    authenticationErrorCode: 0
}

const getters = {
    authenticating: state => state.authenticating,
    loggedIn: state => !!state.accessToken,
    authenticationError: state => state.authenticationError,
    authenticationErrorCode: state => state.authenticationErrorCode
}

const actions = {
    async signin( { commit }, { email, pass, redirect = true } ) {
        commit( 'signStart' )

        try {
            const token = await UserService.signin( email, pass )
            commit( 'signin', token )

            if ( redirect ) {
                router.push( router.history.current.query.redirect || '/app/list' )
            }

            return true
        } catch ( err ) {
            if ( err instanceof AuthenticationError ) {
                commit( 'signErr', { errorCode: err.errorCode, errorMessage: err.message } )
            }

            return false
        }
    },

    async signup( { commit }, { email, familName, name, pass } ) {
        commit( 'signStart' )

        try {
            await UserService.signup( email, familName, name, pass )
            commit( 'signup' )

            router.push( '/signin' )

            return true
        } catch ( err ) {
            if ( err instanceof AuthenticationError ) {
                commit( 'signErr', { errorCode: err.errorCode, errorMessage: err.message } )
            }

            return false
        }
    },

    logout( { commit } ) {
        UserService.logout()
        commit( 'logout' )
        router.push( '/signin' )
    }
}

const mutations = {
    signStart( state ) {
        state.authenticating = true
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    signin( state, accessToken ) {
        state.accessToken = accessToken
        state.authenticating = false
    },

    signup( state ) {
        state.authenticating = false
    },

    signErr( state, { errorCode, errorMessage } ) {
        state.authenticating = false
        state.authenticationError = errorMessage
        state.authenticationErrorCode = errorCode
    },

    logout( state ) {
        state.accessToken = ''
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
