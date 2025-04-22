// config.test.js

const config = {
  "api-key": {
      "name": "api-key",
      "type": "api-key",
      "disabled": false
  },
  "custom-function": {
      "name": "custom-function",
      "type": "custom-function",
      "config": {
          "authFunctionName": "poster_hooks"
      },
      "disabled": false
  }
};

describe("Plugin Configuration Tests", () => {
  test("Config should contain both 'api-key' and 'custom-function'", () => {
      expect(Object.keys(config)).toEqual(expect.arrayContaining(['api-key', 'custom-function']));
  });

  test("'api-key' plugin should have correct structure and values", () => {
      const apiKey = config["api-key"];
      expect(apiKey).toBeDefined();
      expect(typeof apiKey).toBe("object");
      expect(apiKey.name).toBe("api-key");
      expect(apiKey.type).toBe("api-key");
      expect(apiKey.disabled).toBe(false);
  });

  test("'custom-function' plugin should have correct structure and values", () => {
      const customFunc = config["custom-function"];
      expect(customFunc).toBeDefined();
      expect(typeof customFunc).toBe("object");
      expect(customFunc.name).toBe("custom-function");
      expect(customFunc.type).toBe("custom-function");
      expect(customFunc.disabled).toBe(false);
      expect(customFunc.config).toBeDefined();
      expect(customFunc.config.authFunctionName).toBe("poster_hooks");
  });

  test("'custom-function' should include config with 'authFunctionName' of type string", () => {
      const authFn = config["custom-function"].config.authFunctionName;
      expect(typeof authFn).toBe("string");
      expect(authFn.length).toBeGreaterThan(0);
  });

  test("All plugins should be enabled (disabled: false)", () => {
      Object.values(config).forEach(plugin => {
          expect(plugin.disabled).toBe(false);
      });
  });
});
