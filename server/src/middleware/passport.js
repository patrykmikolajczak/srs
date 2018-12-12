import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserModel } from '../models/user.model'
import CONFIG from '../config/config'
import fs from 'fs'

export default ( passport ) => {
    const certForAccessToken = fs.readFileSync( CONFIG.jwt_path_for_public_key_access_token )
    const options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    options.secretOrKey = certForAccessToken

    passport.use( new Strategy( options, async( jwt_payload, done ) => {

        try {
            const user = await UserModel.getOne( jwt_payload.user_id )

            if ( user ) {
                return done( null, user )
            } else {
                return done( null, false )
            }

        } catch ( err ) {
            return done( err, false )
        }

    } ) )
}
