module.exports = {
    apps: [
        {
            name: "EpicureBackend",
            script: "ts-node ./src/app.ts",
            env: {
                NODE_ENV: "staging",
                ATLAS_URL: process.env.ATLAS_URL,
                DB_NAME: process.env.DB_NAME,
                PORT: process.env.DB_NAME,
                SECRET_KEY: process.env.SECRET_KEY,
            },
        },
    ],
    deploy: {
        staging: {
            key: "/Users/shaharsaadon/.ssh/secret_epicure.pem",
            user: "ubuntu",

            host: ["ec2-13-49-244-35.eu-north-1.compute.amazonaws.com"],

            ref: "origin/jwtAuthentication",

            repo: "git@github.com:ShaharSaadon/epicure-backendr.git",

            path: "/home/ubuntu/Epicure/backend",

            ssh_options: "StrictHostKeyChecking=no",

            "post-deploy": `mkdir -p logs && npm i && pm2 reload ecosystem.config.js --env staging`,

            "pre-deploy-local": "echo 'Deploying code to servers'",
            env: {
                NODE_ENV: "staging",
                ATLAS_URL: process.env.ATLAS_URL,
                DB_NAME: process.env.DB_NAME,
                PORT: process.env.DB_NAME,
                SECRET_KEY: process.env.SECRET_KEY,
            },
        },
    },
};
