# Use the official Node.js image as a base
FROM node:12

# Set the working directory inside the container
WORKDIR /usr/src/app
# WORKDIR /app
 
# Copy package.json and package-lock.json to the working directory
COPY package*.json server.ts ./

# Copy the rest of the application to the working directory
COPY . .

# Install the app's dependencies inside the container
RUN npm install -g npm@latest
RUN npm install -g ts-node
RUN npm cache clean --force
RUN npm cache verify
RUN npm install --save-dev @types/express
RUN npm install --save-dev @types/dotenv
RUN npm install --save-dev @types/mongoose
RUN npm install --save-dev @types/cookie-parser

# Expose the port your app runs on (e.g., 3000 for an Express app)
EXPOSE 4000

# Command to run your app
CMD ["npm", "start"]