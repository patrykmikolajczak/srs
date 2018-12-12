import db from './db'
import Logger from '../utils/Logger'
const errorLogger = new Logger( 'error', 'error.user.model.log' )

const TokenModel = {

    /**
     * Save refresh token in table Tokens
     *
     * @param { Object } data - Object with user id and refresh token
     * @return { any } - Table row or false
     */
    create: async( data ) => {
        const text = `INSERT INTO
        tokens( user_id, refresh_token)
        VALUES($1, $2)
        returning *`

        const values = [
            data.user_id,
            data.refresh_token
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
     * Get one token by user id
     *
     * @param { Object } data - Object with user id
     * @return { any } - Return table row or false
     */
    getOne: async( data ) => {
        const text = `SELECT *
        FROM tokens
        WHERE user_id = $1`

        const values = [
            data.user_id
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
     * Delete token from Tokens by user id
     *
     * @param { Object } data - Object with user id
     * @return { any } - Return table row or false
     */
    deleteOne: async( data ) => {
        const text = `DELETE FROM tokens 
        WHERE id = $1
        returning *`

        const values = [
            data.user_id
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    }

}

export { TokenModel }
