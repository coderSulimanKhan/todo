FROM oven/bun:1-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/bun.lock ./
RUN bun install --frozen-lockfile
COPY frontend .
RUN bun run build

FROM oven/bun:1-alpine AS backend
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
COPY --from=frontend /app/frontend/dist ./frontend/dist
EXPOSE 4000
ENTRYPOINT ["bun", "backend/server.js"]