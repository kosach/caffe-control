// productsAccessControl.test.js

const accessControlConfig = {
    "collection": "products",
    "database": "easy-control",
    "roles": [
        {
            "name": "readAll",
            "apply_when": {},
            "document_filters": {
                "write": false,
                "read": true
            },
            "read": true,
            "write": false,
            "insert": false,
            "delete": false,
            "search": true
        }
    ]
};

describe("Access Control for 'products' Collection", () => {
    test("Should include valid collection and database names", () => {
        expect(accessControlConfig.collection).toBe("products");
        expect(accessControlConfig.database).toBe("easy-control");
    });

    test("Should define exactly one role named 'readAll'", () => {
        expect(accessControlConfig.roles.length).toBe(1);
        const role = accessControlConfig.roles[0];
        expect(role.name).toBe("readAll");
    });

    test("'readAll' role should have correct access rights", () => {
        const role = accessControlConfig.roles[0];
        expect(role.read).toBe(true);
        expect(role.write).toBe(false);
        expect(role.insert).toBe(false);
        expect(role.delete).toBe(false);
        expect(role.search).toBe(true);
    });

    test("'readAll' role should define document filters properly", () => {
        const filters = accessControlConfig.roles[0].document_filters;
        expect(filters.read).toBe(true);
        expect(filters.write).toBe(false);
    });

    test("Permissions and filters should all be boolean", () => {
        const role = accessControlConfig.roles[0];
        const perms = ["read", "write", "insert", "delete", "search"];
        perms.forEach(perm => {
            expect(typeof role[perm]).toBe("boolean");
        });

        expect(typeof role.document_filters.read).toBe("boolean");
        expect(typeof role.document_filters.write).toBe("boolean");
    });

    test("'apply_when' should be an object (empty or not)", () => {
        expect(typeof accessControlConfig.roles[0].apply_when).toBe("object");
    });
});

