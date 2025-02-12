const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
      title: "Minha API",
      description: "Documentação da API",
    },
    host: `localhost:3000`,
    schemes: ["http"],
  };
  
  const outputFile = "./swagger_output.json"; // Arquivo gerado
  const endpointsFiles = ["./src/routes/postRouter.ts", "./src/routes/userRouter.ts"]; // Arquivos com as rotas

  swaggerAutogen(outputFile, endpointsFiles, doc);