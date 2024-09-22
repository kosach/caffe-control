exports = async function ({ body, ...rest }) {
  const axios = require("axios").default;
  const dbName = "easy-control";
  const watesLogsCollectionName = "wastes-logs";
  var serviceName = "mongodb-atlas"

  //Get WriteOffs from request
  const posterApi = context.values.get("posterApi");
  const posterToken = context.values.get("posterToken");
  const url = `${posterApi}storage.createWriteOff?token=${posterToken}`;
  const writeOffs = JSON.parse(body.text());

  if(!writeOffs || !Array.isArray(writeOffs) || writeOffs.length === 0){
    console.log('Error - writeOffs', writeOffs);
    throw new Error('[createWriteOffs] Wrong data format');
  }
  const result = []

  for await (const writeOff of writeOffs) {
    const data = JSON.stringify(writeOff);
    const config = {
      method: "post",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    await axios
      .request(config)
      .then((response) => {
        console.log(Object.keys(response))
        result.push({...writeOff, ...{ status: response.data }})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const mongodb = context.services.get("mongodb-atlas");
  const wastesLogsCollection = mongodb.db("easy-control").collection("wastes-logs");
  const insertResults = await wastesLogsCollection.insertMany(result)
  .then(data => data)
  .catch(err => console.error(`Failed to insert item: ${err}`));;

  return {result, insertResults};
};
