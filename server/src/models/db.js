import { Pool } from 'pg'
import CONFIG from '../config/config'

const pool = new Pool( {
    connectionString: CONFIG.db_uri
} )

module.exports = {
    /**
     * DB Query
     *
     * @param { string } text - SQL query
     * @param { object } params - SQL query params
     * @return { Promise } - Return PG promise
     */
    query: ( text, params ) => {
        return pool.query( text, params )
    }
}
