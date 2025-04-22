// accessControl.test.js

const accessControlConfig = {
  "collection": "poster-hooks-data",
  "database": "easy-control",
  "roles": [
      {
          "name": "readAndWriteAll",
          "apply_when": {},
          "document_filters": {
              "write": true,
              "read": true
          },
          "read": true,
          "write": true,
          "insert": true,
          "delete": true,
          "search": true
      }
  ]
};

describe("Access Control Configuration", () => {
  test("Should contain 'collection' and 'database' with string values", () => {
      expect(typeof accessControlConfig.collection).toBe("string");
      expect(typeof accessControlConfig.database).toBe("string");
  });

  test("Should contain at least one role", () => {
      expect(Array.isArray(accessControlConfig.roles)).toBe(true);
      expect(accessControlConfig.roles.length).toBeGreaterThan(0);
  });

  test("Role should have all necessary access rights and filters", () => {
      const role = accessControlConfig.roles[0];
      expect(role).toHaveProperty("name", "readAndWriteAll");
      expect(typeof role.apply_when).toBe("object");

      expect(role.document_filters).toEqual({
          write: true,
          read: true
      });

      // Individual permissions
      expect(role.read).toBe(true);
      expect(role.write).toBe(true);
      expect(role.insert).toBe(true);
      expect(role.delete).toBe(true);
      expect(role.search).toBe(true);
  });

  test("All permissions should be booleans", () => {
      const role = accessControlConfig.roles[0];
      const permissions = ["read", "write", "insert", "delete", "search"];
      permissions.forEach(perm => {
          expect(typeof role[perm]).toBe("boolean");
      });

      const docFilters = role.document_filters;
      expect(typeof docFilters.read).toBe("boolean");
      expect(typeof docFilters.write).toBe("boolean");
  });
});

