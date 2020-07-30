const { MongoClient, ObjectID } = require("mongodb");
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const { request } = require("express");

const client = new MongoClient(process.env["ATLAS_URI"]);
const server = Express();

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());

var collection;

server.post("/create", async (request, response) => {
    try {
        let result = await collection.insertOne(
            {
                "username": request.body.username,
                "score": request.body.score
            }
        );
        response.send({ "_id": result.insertedId });
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

server.get("/get", async (request, response) => {
    try {
        let result = await collection.find({}).sort({ score: -1 }).limit(3).toArray();
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

server.listen("3000", async () => {
    try {
        await client.connect();
        collection = client.db("gamedev").collection("scores");
    } catch (e) {
        console.error(e);
    }
});