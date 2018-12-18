const TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

const TokenService = {
    getToken() {
        return localStorage.getItem( TOKEN_KEY )
    },

    setToken( accessToken ) {
        localStorage.setItem( TOKEN_KEY, accessToken )
    },

    removeToken() {
        localStorage.removeItem( TOKEN_KEY )
    },

    getRefreshToken() {
        return localStorage.getItem( REFRESH_TOKEN_KEY )
    },

    setRefreshToken( refreshToken ) {
        localStorage.setItem( REFRESH_TOKEN_KEY, refreshToken )
    },

    removeRefreshToken() {
        localStorage.removeItem( REFRESH_TOKEN_KEY )
    }
}

export default TokenService
