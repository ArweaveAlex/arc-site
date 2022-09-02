module.exports = (plop) => {
  plop.setGenerator("page", {
    description: "Generate a new page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your page name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/templates/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/templates/{{pascalCase name}}/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      {
        type: "add",
        path: "../pages/{{lowerCase name}}.ts",
        templateFile: "templates/page.ts.hbs",
      },
      {
        type: "append",
        path: "../src/templates/index.tsx",
        template:
          "export { default as {{pascalCase name}} } from './{{pascalCase name}}'",
      },
    ],
  });
};
