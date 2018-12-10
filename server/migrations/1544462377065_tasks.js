exports.shorthands = undefined

exports.up = ( pgm ) => {

    pgm.createTable( 'tokens', {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade'
        },
        refresh_token: {
            type: 'varchar(1000)',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func( 'current_timestamp' )
        }
    } )

    pgm.createIndex( 'tokens', 'user_id' )

}

// exports.down = ( pgm ) => {

// }
