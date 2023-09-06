module.exports = {
    apps: [
        {
            name: "EpicureBackend",
            // script: "npm start ./server.ts",
            script: "./node_modules/.bin/ts-node server.ts",
            env: {
                NODE_ENV: "staging",
                ATLAS_URL: process.env.ATLAS_URL,
                DB_NAME: process.env.DB_NAME,
                PORT: process.env.PORT,
                SECRET_KEY: process.env.SECRET_KEY,
            },
        },
    ],
    deploy: {
        staging: {
            key: "/Users/shaharsaadon/.ssh/secret_epicure.pem",
            user: "ubuntu",

            host: ["ec2-16-171-159-85.eu-north-1.compute.amazonaws.com"],

            ref: "origin/jwtAuthentication",

            repo: "git@github.com:ShaharSaadon/epicure-backend.git",

            path: "/home/ubuntu/epicure/backend/",

            ssh_options: "StrictHostKeyChecking=no",

            "post-deploy": `mkdir -p logs && sudo npm i && pm2 reload ecosystem.config.js --env staging`,

            "pre-deploy-local": "echo 'Deploying code to servers'",
            env: {
                NODE_ENV: "staging",
                ATLAS_URL: process.env.ATLAS_URL,
                DB_NAME: process.env.DB_NAME,
                PORT: process.env.PORT,
                SECRET_KEY: process.env.SECRET_KEY,
            },
        },
    },
};
