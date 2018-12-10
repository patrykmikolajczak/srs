import { ExtractJwt, Strategy } from 'passport-jwt'
import UserModel from '../models/user.model'
import CONFIG from '../config/config'

export default ( passport ) => {
    const options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    options.secretOrKey = CONFIG.jwt_encryption

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
