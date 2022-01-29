
const CosmosClient = require("@azure/cosmos").CosmosClient;



const config = {
    endpoint: "https://taihobotdb.documents.azure.com:443/",
    key: "Bk59NrA2pMCSg2hJWIjuuKjNLEIjKirQNmQu7BbymEh9BYOdKZLMPR1rQs9qpZfYmYr9wJxqI4Qpo8OgForjOQ==",
    databaseId: "botConversation",
    containerId: "botConversation"
  };

  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);
  const responseMessage = "Done";


module.exports = async function (context, req) {
    console.log (config.containerId)
    
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT * from botConversation" 
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