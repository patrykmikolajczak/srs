require ( 'dotenv' ).config() // instatiate environment variables

const CONFIG = {} // Make this global to use all over the application

CONFIG.app                                      = process.env.APP               || 'development'
CONFIG.port                                     = process.env.PORT              || '3000'

CONFIG.db_uri                                   = process.env.DB_URI            || 'mongo'

CONFIG.jwt_encryption                           = process.env.JWT_ENCRYPTION    || 'jwt_please_change'
CONFIG.jwt_expiration                           = process.env.JWT_EXPIRATION    || '10000'
CONFIG.jwt_path_for_private_key_access_token    = './src/ssl/privateKeyForAccessToken.key'
CONFIG.jwt_path_for_public_key_access_token     = './src/ssl/publicKeyForAccessToken.pem'
CONFIG.jwt_path_for_private_key_refresh_token   = './src/ssl/privateKeyForRefreshToken.key'
CONFIG.jwt_path_for_public_key_refresh_token    = './src/ssl/publicKeyForRefreshToken.pem'

module.exports = CONFIG
