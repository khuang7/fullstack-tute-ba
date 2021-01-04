import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path'

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Post],
    dbName: "mydb",
    type: "postgresql", // for me this works..
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]; ; // originally the  type of this whole thing would be a string, but as const makes it
// a db type 

// we can access this whole info now from the CLI