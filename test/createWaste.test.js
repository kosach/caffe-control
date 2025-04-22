const axios = require("axios");
jest.mock("axios");

const mockContext = {
  values: {
    get: jest.fn((key) => {
      if (key === "posterApi") return "https://api.example.com/";
      if (key === "posterToken") return "test-token";
    }),
  },
  services: {
    get: jest.fn(() => ({
      db: () => ({
        collection: () => ({
          insertMany: jest.fn(async (docs) => ({ insertedCount: docs.length }))
        })
      })
    }))
  }
};

// Inject `context` into global scope (Realm-style)
global.context = mockContext;

const createWriteOffs = require("./createWriteOffs"); // adjust path if needed

describe("createWriteOffs", () => {
  beforeEach(() => {
    axios.request.mockReset();
  });

  test("throws an error if writeOffs is missing", async () => {
    const mockBody = { text: () => "null" };

    await expect(createWriteOffs({ body: mockBody }))
      .rejects.toThrow('[createWriteOffs] Wrong data format');
  });

  test("processes writeOffs and inserts into MongoDB", async () => {
    const mockWriteOffs = [{ id: 1 }, { id: 2 }];
    const mockBody = { text: () => JSON.stringify(mockWriteOffs) };

    axios.request.mockResolvedValueOnce({ data: { success: true } });
    axios.request.mockResolvedValueOnce({ data: { success: true } });

    const result = await createWriteOffs({ body: mockBody });

    expect(result.result.length).toBe(2);
    expect(result.result[0]).toHaveProperty("status");
    expect(result.insertResults.insertedCount).toBe(2);
    expect(axios.request).toHaveBeenCalledTimes(2);
  });

  test("logs error if axios request fails", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mockWriteOffs = [{ id: 1 }];
    const mockBody = { text: () => JSON.stringify(mockWriteOffs) };

    axios.request.mockRejectedValueOnce(new Error("Axios failed"));

    await createWriteOffs({ body: mockBody });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });
});


