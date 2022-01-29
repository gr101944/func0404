const { CosmosClient } = require("@azure/cosmos");
var endpoint = process.env["CosmosDBEndpoint"];
var key = process.env["CosmosDBAuthKey"];
var databaseName = process.env["DatabaseName"];
var collectionName = process.env["configCollectionName"];
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseName);
const container = database.container(collectionName);

module.exports = async function (context, req) {
    console.log (collectionName)
    context.log('JavaScript HTTP trigger function processed a request.');


    const querySpec = {
        query: "SELECT *  from botConfig c WHERE c.domainName = " + "'" + req.body.domainName + "'"
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
    
    var itemBody = {

        "domainName": req.body.domainName,
        "domainLabel": req.body.domainLabel,
        "host": req.body.host,
        "isDomainActive": req.body.isDomainActive,
        "knowledgeBaseId": req.body.knowledgeBaseId,
        "knowledgeBaseEndpointKey": req.body.knowledgeBaseEndpointKey,
        "maxResponsesInSearch": req.body.maxResponsesInSearch,
        "confidenceThreshold": req.body.confidenceThreshold,
        "helpText": req.body.helpText,
        "reasonPhrases" : req.body.reasonPhrases,
        "primaryEmailContact": req.body.primaryEmailContact,
        "secondaryEmailContact": req.body.secondaryEmailContact,
        "lookbackTimeForLog": req.body.lookbackTimeForLog
    }
    console.log ("_______________________________")
    console.log (items.length)
    console.log (JSON.stringify (items))
    
    if(items.length != 0)
    {   
        console.log ( "Item exists " + items[0].id)
        itemBody.id = items[0].id;
        console.log ( itemBody.id)
    }


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