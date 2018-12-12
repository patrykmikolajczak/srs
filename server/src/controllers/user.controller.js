import { UserModel } from '../models/user.model'
import { TokenModel } from '../models/token.model'
import Logger from '../utils/Logger'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/config'
import fs from 'fs'

// const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.log' )

const UserController = {

    /**
     * Registration of the user
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    create: async( req, res ) => {
        const body = req.body

        const validation_errors = []

        if ( validator.isEmpty( body.name ) ) {
            validation_errors.push( 'Name is required' )
        }

        if ( validator.isEmpty( body.family_name ) ) {
            validation_errors.push( 'Family name is required' )
        }

        if ( validator.isEmpty( body.password ) ) {
            validation_errors.push( 'Password is required' )
        }

        if ( validator.isEmpty( body.email ) ) {
            validation_errors.push( 'E-mail is required' )
        }

        if ( !validator.isEmail( body.email ) ) {
            validation_errors.push( 'Incorrect e-mail adress' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                const pass = await UserModel.hashPassword( body.password )
                if ( pass ) {
                    body.password = pass
                    const user = await UserModel.create( body )
                    if ( !user ) {
                        return res.status( 400 ).json( { error: '' } )
                    }

                    return res.status( 200 ).json( user )
                } else {
                    return res.status( 400 ).json( { error: 'Hash password error!' } )
                }
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    },

    /**
     * Login user
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    login: async( req, res ) => {
        const body = req.body

        const validation_errors = []

        if ( validator.isEmpty( body.password ) ) {
            validation_errors.push( 'Password is required' )
        }

        if ( validator.isEmpty( body.email ) ) {
            validation_errors.push( 'E-mail is required' )
        }

        if ( !validator.isEmail( body.email ) ) {
            validation_errors.push( 'Incorrect e-mail adress' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                const user = await UserModel.getOne( body.email )

                if ( user ) {
                    if ( await UserModel.comparePassword( body.password, user.password ) ) {
                        return await UserController.generateAndSaveTokens( user, res )
                    } else {
                        return res.status( 400 ).json( { error: 'Incorrect email or password' } )
                    }
                }

                return res.status( 400 ).json( { error: 'No user found' } )
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    },

    /**
     * Refresh accessToken and generate new refreshToken
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    refresh: async( req, res ) => {
        const body = req.body

        const validation_errors = []

        if ( validator.isEmpty( body.refreshToken ) ) {
            validation_errors.push( 'E-mail is required' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                const certForRefreshToken = await fs.readFileSync( CONFIG.jwt_path_for_public_key_refresh_token )
                const verifyRefreshToken = await jwt.verify(
                    body.refreshToken,
                    certForRefreshToken,
                    {
                        algorithms: [ 'RS256' ]
                    }
                )

                if ( verifyRefreshToken ) {
                    const save_token = await TokenModel.getOne( {
                        user_id: verifyRefreshToken.user_id
                    } )

                    if ( save_token ) {

                        if ( save_token.refresh_token === body.refreshToken ) {
                            const user = await UserModel.getOne( verifyRefreshToken.user_id )

                            if ( user ) {
                                await TokenModel.deleteOne( {
                                    user_id: user.id
                                } )

                                return await UserController.generateAndSaveTokens( user, res )
                            }

                            return res.status( 400 ).json( { error: 'Token refresh error' } )
                        }

                        return res.status( 400 ).json( { error: 'Tokens do not match' } )
                    }

                    return res.status( 400 ).json( { error: 'Token is incorrect' } )
                }

                return res.status( 400 ).json( { error: 'Token is incorrect' } )
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    },

    /**
     * Generate access and refresh tokens and save refresh token
     *
     * @param { Object } user Object with user id
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    generateAndSaveTokens: async( user, res ) => {
        // Generate accessToken and refreshToken on user data
        const auth_key = await UserModel.generateAccessAndRefreshToken( user )

        if ( auth_key ) {
            // Save refreshToken in DB
            const save_token = await TokenModel.create( {
                user_id: user.id,
                refresh_token: auth_key.refreshToken
            } )
            if ( save_token ) {
                return res.status( 200 ).json( auth_key )
            } else {
                return res.status( 400 ).json( { error: 'Problem to save token' } )
            }
        } else {
            return res.status( 400 ).json( { error: 'Problem with generating tokens' } )
        }
    }
}

export { UserController }
