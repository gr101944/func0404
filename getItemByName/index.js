const { CosmosClient } = require("@azure/cosmos");
const endpoint = process.env["CosmosDBEndpoint"];
const key = process.env["CosmosDBAuthKey"];
const databaseName = process.env["DatabaseName"];
const collectionName = process.env["masterRefCollectionName"];
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseName);
const container = database.container(collectionName);
  

  

module.exports = async function (context, req) {
    // console.log (JSON.stringify (req))
     
     console.log(`Querying container: Items`);
 
     // query to return all items
     const querySpec = {
       query: "SELECT *  from masterRef c    WHERE c.itemName = " + "'" + req.query.itemName + "'"
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