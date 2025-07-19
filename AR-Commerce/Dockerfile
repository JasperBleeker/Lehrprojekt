# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static
COPY --from=builder /app/src/products /app/src/products

RUN npm ci --omit=dev
EXPOSE 3000
ENV MONGO_URI=""
CMD ["node", "build/index.js"]  # <-- Adjust this if your entry point is different 
