# Use the official Node.js image as a base
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app's dependencies inside the container
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Expose the port your app runs on (e.g., 3000 for an Express app)
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]