exports.shorthands = undefined

exports.up = ( pgm ) => {

    pgm.createTable( 'categories', {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade'
        },
        name: {
            type: 'varchar(200)',
            notNull: true
        },
        description: {
            type: 'text',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func( 'current_timestamp' )
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func( 'current_timestamp' )
        },
        deleted_at: {
            type: 'timestamp',
            default: null
        }
    } )

    pgm.createIndex( 'categories', 'id' )
}

// exports.down = (pgm) => {

// };
