// transactionsAccessControl.test.js

const accessControlConfig = {
    "collection": "transactions",
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

describe("Access Control Configuration for 'transactions' Collection", () => {
    test("Should contain correct collection and database names", () => {
        expect(accessControlConfig.collection).toBe("transactions");
        expect(accessControlConfig.database).toBe("easy-control");
    });

    test("Should contain one role named 'readAll'", () => {
        expect(Array.isArray(accessControlConfig.roles)).toBe(true);
        expect(accessControlConfig.roles.length).toBe(1);

        const role = accessControlConfig.roles[0];
        expect(role.name).toBe("readAll");
    });

    test("Role 'readAll' should have correct permissions", () => {
        const role = accessControlConfig.roles[0];
        expect(role.read).toBe(true);
        expect(role.write).toBe(false);
        expect(role.insert).toBe(false);
        expect(role.delete).toBe(false);
        expect(role.search).toBe(true);
    });

    test("'document_filters' should be correctly defined", () => {
        const filters = accessControlConfig.roles[0].document_filters;
        expect(filters.read).toBe(true);
        expect(filters.write).toBe(false);
    });

    test("All permissions and filters should be booleans", () => {
        const role = accessControlConfig.roles[0];
        const permissions = ['read', 'write', 'insert', 'delete', 'search'];
        permissions.forEach(key => {
            expect(typeof role[key]).toBe('boolean');
        });

        const filters = role.document_filters;
        expect(typeof filters.read).toBe('boolean');
        expect(typeof filters.write).toBe('boolean');
    });

    test("'apply_when' should be an object", () => {
        const applyWhen = accessControlConfig.roles[0].apply_when;
        expect(typeof applyWhen).toBe('object');
    });
});


