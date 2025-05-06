describe("Request handler function", () => {
    let insertMock, context, func;
  
    beforeEach(() => {
      insertMock = jest.fn();
      
      global.context = {
        services: {
          get: () => ({
            db: () => ({
              collection: () => ({
                insertOne: insertMock
              })
            })
          })
        }
      };
  
      // Load function under test (simulate Realm exports)
      func = async function({ body }, response) {
        const reqBody = body;
        const newItem = JSON.parse(await reqBody.text());
        const hooks = context.services.get("mongodb-atlas").db("easy-control").collection("poster-hooks-data");
        return await hooks.insertOne(newItem)
          .then(result => result)
          .catch(err => console.error(`Failed to insert item: ${err}`));
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // test("inserts valid item into MongoDB", async () => {
    //   const item = { name: "Test", value: 42 };
    //   const mockBody = {
    //     text: async () => JSON.stringify(item)
    //   };
    //   const insertResult = { insertedId: "abc123" };
    //   insertMock.mockResolvedValue(insertResult);
  
    //   const result = await func({ body: mockBody });
    //   expect(insertMock).toHaveBeenCalledWith(item);
    //   expect(result).toEqual(insertResult);
    // });
  
    // test("logs error if MongoDB insert fails", async () => {
    //   const item = { name: "Test" };
    //   const mockBody = {
    //     text: async () => JSON.stringify(item)
    //   };
    //   const error = new Error("Insert failed");
    //   insertMock.mockRejectedValue(error);
    //   const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  
    //   await func({ body: mockBody });
    //   expect(consoleSpy).toHaveBeenCalledWith(`Failed to insert item: ${error}`);
    //   expect(insertMock).toHaveBeenCalledWith(item);
  
    //   consoleSpy.mockRestore();
    // });
  
    test("throws error on invalid JSON in body", async () => {
      const mockBody = {
        text: async () => "not-json"
      };
  
      await expect(func({ body: mockBody })).rejects.toThrow();
    });
  });
  

