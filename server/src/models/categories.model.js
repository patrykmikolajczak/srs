import db from './db'
import Logger from '../utils/Logger'

// const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.user.model.log' )

const CategoryModel = {

    create: async( data ) => {
        const text = `INSERT INTO 
        categories( user_id, name, description ) 
        VALUES($1, $2, $3)
        returning *`

        const values = [
            data.user_id,
            data.name,
            data.description
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    getAllByUserId: async( data ) => {
        const text = `SELECT id, name, description, updated_at 
        FROM categories
        WHERE
            user_id = $1
            AND deleted_at IS NULL`

        const values = [
            data.id
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    update: async( data ) => {
        const text = `UPDATE categories
        SET name=$2,description=$3,updated_at=$4
        WHERE id = $1 
        returning *`

        const values = [
            data.id,
            data.name,
            data.description,
            new Date()
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    deleteOne: async( data ) => {
        const text = `DELETE FROM categories 
        WHERE id = $1
        returning *`

        const values = [
            data.id
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

export { CategoryModel }
