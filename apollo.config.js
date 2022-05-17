// Config for the vscode extension
// https://www.apollographql.com/docs/devtools/apollo-config
module.exports = {
    client: {
        // Doesn't work without APOLLO_KEY in env
        service: 'fedora-books-backend@dev',
        // Or you can get schema by introspection (only if enabled in prod or server is dev)
        // {
        //     name: 'fedora-books-backend',
        //     url: 'http://localhost:3000/graphql',
        // },
        // Files processed by the extension
        includes: [ 
            // 'src/**/*.vue',
            // 'src/**/*.ts',
            'src/queries/**/*.gql',
        ],
        excludes: [
            'src/generated/*.ts'
        ]
    },
}
