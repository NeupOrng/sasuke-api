# Use Node.js v14 as the base image
FROM node:18-alpine as builder

RUN apk add --no-cache make gcc g++ python3
# Create the working directory
WORKDIR /app

RUN npm rebuild bcrypt --build-from-source

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

FROM node:18-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Expose the port used by the application
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start:prod" ]
