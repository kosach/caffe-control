// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {

    const moment = require("moment");
    console.log(JSON.stringify(query))
    const {startDate, endDate} = query;

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "easy-control";
  var collName = "transactions";
  
  const mongoQuery = {}

  if(startDate && endDate){
    console.log("startDate, endDate: ", startDate, endDate);
    Object.assign(mongoQuery, {
      date_close_date: {
        $gte: `${startDate} 00:00:00`,
        $lte: `${endDate} 23:59:59`
      },
    })
  }

  // Get a collection from the context
  const transactionsCollection = context.services.get(serviceName).db(dbName).collection(collName);
  return transactionsCollection.find(mongoQuery);
};