import dotenv from 'dotenv'
dotenv.config()
console.log(process.env)

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/main",
} = process.env;

export const apps = [
  {
    name: "mesto",
    script: "./dist/app.js",
  },
];
export const deploy = {
  production: {
    user: DEPLOY_USER,
    host: DEPLOY_HOST,
    ref: DEPLOY_REF,
    repo: "https://github.com/DmitryBaranovAndreevich/mesto-project-plus.git",
    path: DEPLOY_PATH,
    "pre-deploy-local": `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
    "post-deploy": "npm i && npm run build",
  },
};
