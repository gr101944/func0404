const { CosmosClient } = require("@azure/cosmos");
const endpoint = process.env["CosmosDBEndpoint"];
const key = process.env["CosmosDBAuthKey"];
const databaseName = process.env["DatabaseName"];
const collectionName = process.env["configCollectionName"];
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseName);
const container = database.container(collectionName);


module.exports = async function (context, req) {

  console.log ("endPoint " + endpoint);
  console.log ("key " + key);
  console.log ("databaseName " + databaseName);
  console.log ("collectionName " + collectionName);

    
    
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT c.domainName, c.domainLabel, c.isDomainActive, c.knowledgeBaseId, c.knowledgeBaseEndpointKey, c.host, c.maxResponsesInSearch, c.confidenceThreshold, c.helpText, c.reasonPhrases, c.primaryEmailContact, c.secondaryEmailContact, c.lookbackTimeForLog, c.ccToUser  from botConfig c" 
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: items
    };
}