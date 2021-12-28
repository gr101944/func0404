
const CosmosClient = require("@azure/cosmos").CosmosClient;

var endpoint =  "https://taihobotdb.documents.azure.com:443/"
var key = "Bk59NrA2pMCSg2hJWIjuuKjsNLEIjKirQNmQu7BbymEh9BYOdKZLMPR1rQs9qpZfYmYr9wJxqI4Qpo8OgForjOQ=="
const databaseId = "botDB";
const containerId = "masterRef";
var partitionKey = { kind: "Hash", paths: ["/idName"] }


//const { endpoint, key, databaseId, containerId, partitionKey } = config;

const client = new CosmosClient({ endpoint, key });

//   const database = client.database(databaseId);
//   const container = database.container(containerId);
const responseMessage = "Done";
/*
// This script ensures that the database is setup and populated correctly
*/
async function create(client, databaseId, containerId) {
    console.log ("*******************************");
    console.log ("Database ID "+ JSON.stringify (databaseId));
    console.log ("Container id " + containerId);
    const partitionKey = config.partitionKey;
    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
        id: databaseId
});
console.log(`Created database:\n${database.id}\n`);

  /**
   * Create the container if it does not exist
   */
    const { container } = await client
        .database(databaseId)
        .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400 }
    );

  console.log(`Created container:\n${container.id}\n`);
}

module.exports = { create };