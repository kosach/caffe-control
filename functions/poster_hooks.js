// This function is the endpoint's request handler.
exports = async function({ query, headers, body, ...rest}, response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    // const {arg1, arg2} = query;

    // Headers, e.g. {"Content-Type": ["application/json"]}
    // const contentTypes = headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const reqBody = body;

    // You can use 'context' to interact with other application features.
    // Accessing a value:
    // var x = context.values.get("value_name");
    // console.log('rest', Object.keys(rest));
const newItem = JSON.parse(reqBody.text());
    const collectionName = "poster-hooks-data";
    const mongodb = context.services.get("mongodb-atlas");
    const hooks = mongodb.db("easy-control").collection(collectionName);
    return await hooks.insertOne(newItem)
    .then(result => result)
    .catch(err => console.error(`Failed to insert item: ${err}`));

    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    // return  {data: "Hello World!"};
};
