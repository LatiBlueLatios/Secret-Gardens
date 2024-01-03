class Validator extends Error {
    /**
     * @param {any} name
     * @param {any} property
     */
    constructor(name, property) {
        super();
        this.name = name;
        this.property = property;
    }

    /**
     * @param {string} json
     */
    checkJSON(json) {
        try {
            JSON.parse(json);
        } catch (e) {
            if (e instanceof SyntaxError) {
                throw new Error(`SyntaxError: ${e}`);
            } else {
                throw e;
            }
        }
    }
}