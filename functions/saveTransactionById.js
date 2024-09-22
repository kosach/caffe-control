exports = async function(changeEvent){
  const axios = require("axios").default;
   // Destructure out fields from the change stream event object
  const {fullDocument } = changeEvent;
  if(fullDocument.object === 'transaction' && fullDocument.action === 'closed'){
   try {
    console.log('Starting to process transaction: ', fullDocument.object_id)
    const response = await axios(`https://joinposter.com/api/dash.getTransaction?token=333226:30801548ce55da04fb2f8d0753a1008b&transaction_id=${fullDocument.object_id}&include_history=true&include_products=true&include_delivery=true`);
    const transaction = response.data.response[0];

    console.log('Saving transaction:', transaction.transaction_id);
    
    const collectionName = "transactions";
    const mongodb = context.services.get("mongodb-atlas");
    const transactions = mongodb.db("easy-control").collection(collectionName);

    const result = await transactions.insertOne(transaction);
    console.log('End process transaction ', JSON.stringify(result));
    return result;
    } catch(err) {
      console.log("Error occurred while executing findOne:", err.message);
      return { error: err.message };
    }
  }
};