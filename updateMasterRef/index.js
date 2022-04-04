const { CosmosClient } = require("@azure/cosmos");
const endpoint = process.env["CosmosDBEndpoint"];
const key = process.env["CosmosDBAuthKey"];
const databaseName = process.env["DatabaseName"];
const collectionName = process.env["masterRefCollectionName"];
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseName);
const container = database.container(collectionName);

module.exports = async function (context, req) {
    
    context.log('JavaScript HTTP trigger function processed a request.');
    var itemBody = {

        "itemName": req.body.itemName,
        "resourcestrings": req.body.resourcestrings

    }

    console.log ("itemBody here " +JSON.stringify (itemBody))
    const querySpec = {
        query: "SELECT *  from masterRef c WHERE c.itemName = " + "'" + req.body.itemName + "'"
    };
    console.log (querySpec.query)
    
    // read all items in the Items container
    const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: items
    };
    

    console.log ("_______________________________")
    console.log (items.length)
    console.log (JSON.stringify (items))

    
    
    if(items.length != 0)
    {   
        console.log ( "Item exists " + items[0].id)
        itemBody.id = items[0].id;
        console.log ( itemBody.id)
    }

    console.log ("itemBody before UPSERT " +JSON.stringify (itemBody))


    await client.database(databaseName).container(collectionName).items.upsert(itemBody)
    .then((status) => { 
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Item Saved successfully"
        };
    })
    .catch((err) => { 
        context.res = {
            status: 500,
            body: err
        };
    });        
};