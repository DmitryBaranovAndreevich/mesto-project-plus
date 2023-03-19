require("dotenv").config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/main",
} = process.env;

module.exports = {
  apps: [
    {
      name: "mesto",
      script: "./dist/app.js",
    },
  ],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "https://github.com/DmitryBaranovAndreevich/mesto-project-plus.git",
      path: DEPLOY_PATH,
      "pre-deploy": `scp -vvv .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      "post-deploy": "npm i && npm run build",
    },
  },
};
