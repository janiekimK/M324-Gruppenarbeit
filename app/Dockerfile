# Builder stage
FROM node:20-slim AS builder
WORKDIR /app

# Install dependencies using lockfile for reproducible builds
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-slim
LABEL service="m324-gruppenarbeit"
WORKDIR /app

# Copy only built output (Angular SSR expects server and browser folders)
COPY --from=builder /app/dist/app/ .

# Configure port and startup command
ENV PORT=80
EXPOSE 80
CMD ["node", "/app/server/server.mjs"]

