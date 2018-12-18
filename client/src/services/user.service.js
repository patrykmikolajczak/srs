import ApiService from './api.service'
import TokenService from './storage.service'

class AuthenticationError extends Error {
    constructor( errorCode, message ) {
        super( message )
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    /**
     * Sign in the user and store the accessToken to TokenService
     *
     * @constructor
     * @param { string } email - Email
     * @param { string } password - Password
     * @return { string } accessToken
     * @throws { object } AuthenticationError
     */
    signin: async( email, password ) => {
        const requestData = {
            email,
            password
        }

        try {
            const resp = await ApiService.post( 'auth/login', requestData )

            TokenService.setToken( resp.data.accessToken )
            TokenService.setRefreshToken( resp.data.refreshToken )
            ApiService.setHeader()

            return resp.data.accessToken
        } catch ( err ) {
            throw new AuthenticationError( err.response.status, err.response.data.details )
        }
    },

    /**
     * Sign up the user
     *
     * @param { string } email - Email
     * @param { string } familyName - Family name
     * @param { string } name - Name
     * @param { string } password - Password
     * @return { Object } AuthenticationError or Response data
     */
    signup: async( email, familyName, name, password ) => {
        const requestData = {
            email,
            familyName,
            name,
            password
        }

        try {
            const resp = await ApiService.post( 'auth/signup', requestData )

            return resp.data.row
        } catch ( err ) {
            throw new AuthenticationError( err.response.status, err.response.data.details )
        }
    },

    /**
     * Refresh the accessToken
     *
     * @return { string } accessToken
     * @throws { object } AuthenticationError
     */
    refreshToken: async() => {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            refreshToken
        }

        try {
            const resp = await ApiService.post( 'auth/refresh', requestData )

            TokenService.setToken( resp.data.accessToken )
            TokenService.setRefreshToken( resp.data.refreshToken )
            ApiService.setHeader()

            return resp.data.accessToken
        } catch ( err ) {
            throw new AuthenticationError( err.response.status, err.response.data.details )
        }

    },

    /**
     * Logout the user
     *
     * @return {any} none
     */
    logout() {
        TokenService.removeToken()
        TokenService.removeRefreshToken()
        ApiService.removeHeader()
    }

}

export default UserService

export { UserService, AuthenticationError }
