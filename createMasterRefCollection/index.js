// JavaScript

const { CosmosClient } = require("@azure/cosmos");

var endpoint = process.env["CosmosDBEndpoint"];
var key = process.env["CosmosDBAuthKey"];


const client = new CosmosClient({ endpoint, key });

 

const databaseDefinition = { id: "botDBNew" };

const collectionDefinition = { id: "botConfigNew" };
const partitionKey = { kind: "Hash", paths: ["/domainName"] }

const documentDefinition = { domainName: "People", domainLabel: "People (HR)" };

 

async function helloCosmos() {

  const { database } = await client.databases.createIfNotExists({ id: databaseDefinition.id });

  var databaseId  = (database.id);
  console.log (databaseId)

  const { container } = await client
  .database(databaseId)
  .containers.createIfNotExists(
    { id: collectionDefinition.id, partitionKey }
  );

  // const { container } = await database.containers.createIfNotExists(collectionDefinition);

  console.log("created collection");

 

  const { resource } = await container.items.upsert(documentDefinition);

  console.log("Created item with content: ", resource.content);

 

  // await database.delete();

  // console.log("Deleted database");

}

 

module.exports = { helloCosmos }

 

// helloCosmos().catch(err => {

//   console.error(err);

// });