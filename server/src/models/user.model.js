import db from './db'
import Logger from '../utils/Logger'
import bcrypt from 'bcrypt-nodejs'
// const bcrypt = require( 'bcrypt' )

const errorLogger = new Logger( 'error', 'error.user.model.log' )

const UserModel = {

    comparePassword() {},

    /**
     * Bcrypt password
     *
     * @param { string } password - Plaintext password
     * @return { any } - Hash or false
     */
    hashPassword: async( password ) => {
        try {
            let salt = null, hash = null
            salt = await bcrypt.genSaltSync( 10 )

            hash = await bcrypt.hashSync( password, salt )

            return hash
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
     * Create a user in table Users
     *
     * @param { array } data - Array with SQL query data
     * @return { any } - return DB row or false
     */
    async create( data ) {
        const text = `INSERT INTO
        users( family_name, name, email, password)
        VALUES($1, $2, $3, $4)
        returning *`

        const values = [
            data.family_name,
            data.name,
            data.email,
            data.password
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
     * Select all users from table Users
     *
     * @return { any } - return DB row or false
     */
    async getAll() {
        const text = 'SELECT * FROM users WHERE IS_NULL deleted_at'

        try {
            const { rows } = await db.query( text )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
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
            IS_NULL deleted_at
            AND id = $1`

        const values = [
            id
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
     * Update user in table Users by id
     *
     * @param { array } data - Array with SQL query data
     * @return { any } - return DB row or false
     */
    async update( data ) {
        const text = `UPDATE reflections
        SET 
        WHERE id = $1 
        returning *`

        const values = [
            data
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
            errorLogger.log( err )
            return false
        }
    }
}

export { UserModel }
