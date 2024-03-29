# Step 1: Use an official Node.js runtime as a parent image
FROM node:14

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the current directory contents into the container at /usr/src/app
COPY package*.json ./

# Step 4: Install any dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Step 5: Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Step 6: Make port 3000 available to the world outside this container
EXPOSE 3000

# Step 7: Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]
