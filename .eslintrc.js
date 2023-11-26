module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    overrides: [
        {
            env: {
                node: true
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json"
    },
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error"
    }
}
