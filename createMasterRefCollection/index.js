// JavaScript

const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env["CosmosDBEndpoint"];
const key = process.env["CosmosDBAuthKey"];


const client = new CosmosClient({ endpoint, key });

 

const databaseDefinition = { id: "botDB" };

const collectionDefinition1 = { id: "botConfig" };
const collectionDefinition2 = { id: "botConversation" };
const partitionKey1 = { kind: "Hash", paths: ["/domainName"] }
const partitionKey2 = { kind: "Hash", paths: ["/botConversation"] }

const documentDefinition = { domainName: "People", domainLabel: "People (HR)" };

 

async function helloCosmos() {

  // const { database } = await client.databases.createIfNotExists({ id: databaseDefinition.id });

  // var databaseId  = (database.id);
  // console.log (databaseId)

  // const { container } = await client
  // .database(databaseId)
  // .containers.createIfNotExists(
  //   { id: collectionDefinition1.id, partitionKey1 }
  // );
  // console.log("created collection1");

  // const { container } = await client
  // .database(databaseId)
  // .containers.createIfNotExists(
  //   { id: collectionDefinition2.id, partitionKey2 }
  // );
  // console.log("created collection2");

  // const { container } = await database.containers.createIfNotExists(collectionDefinition);

  // console.log("created collection");

 

  // const { resource } = await container.items.upsert(documentDefinition);

  // console.log("Created item with content: ", resource.content);

 

  // await database.delete();

  // console.log("Deleted database");

}

 

module.exports = { helloCosmos }

 

// helloCosmos().catch(err => {

//   console.error(err);

// });