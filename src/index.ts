import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"
import express from 'express'
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import 'reflect-metadata';

// since it is promise we use await.

const main = async () => {
    
    const orm = await MikroORM.init(microConfig); //connect DB
    await orm.getMigrator().up(); // run migrations

    // instant of express allows us to use a restful api thing
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver, PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em }) // function that reutnrs on object
    });

    // creates a brand new endpoint
    apolloServer.applyMiddleware({app});

    //app.get('/', (_, res) => { // underscore instead of req if we ignore it
    //    res.send("hello");
    //})

    app.listen(4000, () => {
        console.log("server started on localhost:4000")
    })

    // run sql down here
    //const post = orm.em.create(Post, {title: 'my first post'})
    //await orm.em.persistAndFlush(post);

    // checks whats in the tables
    //const posts = await orm.em.find(Post, {});
    //console.log(posts);
};

main()

console.log("Hello There")

