module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      {
        type: "append",
        path: "../src/components/index.ts",
        template:
          "export { default as {{pascalCase name}} } from './{{pascalCase name}}'",
      },
    ],
  });
};
