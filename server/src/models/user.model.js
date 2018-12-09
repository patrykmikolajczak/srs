import db from './db'
import Logger from '../../utils/Logger'

const UserModel = {
    errorLogger: new Logger( 'error', 'error.user.model.log' ),

    comparePassword() {},

    /**
     * Create a user in table Users
     *
     * @param { array } data - Array with SQL query data
     * @return { any } - return DB row or false
     */
    async create( data ) {
        const text = `INSERT INTO
        users()
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`

        const values = [
            data
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            this.errorLogger.log( err )
            return false
        }
    },

    /**
     * Select all users from table Users
     *
     * @return { any } - return DB row or false
     */
    async getAll() {
        const text = 'SELECT * FROM users WHERE IS_NULL(deleted_at)'

        try {
            const { rows } = await db.query( text )
            return rows[ 0 ]
        } catch ( err ) {
            this.errorLogger.log( err )
            return false
        }
    },

    /**
    * Select user from Users by id
    *
    * @param { number } id - user id
    * @return { any } - return DB row or false
    */
    async getOne( id ) {
        const text = `SELECT * 
        FROM users 
        WHERE 
            IS_NULL(deleted_at)
            AND id = $1`

        const values = [
            id
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            this.errorLogger.log( err )
            return false
        }
    },

    /**
     * Update user in table Users by id
     *
     * @param { array } data - Array with SQL query data
     * @return { any } - return DB row or false
     */
    async update( data ) {
        const text = `UPDATE reflections
        SET 
        WHERE id=$5 
        returning *`

        const values = [
            data
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            this.errorLogger.log( err )
            return false
        }
    },

    /**
    * Delete user from Users by id
    *
    * @param { number } id - user id
    * @return { any } - return DB row or false
    */
    async delete( id ) {
        const text = `DELETE FROM users 
        WHERE id = $1
        returning *`

        const values = [
            id
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            this.errorLogger.log( err )
            return false
        }
    }
}

export { UserModel }
