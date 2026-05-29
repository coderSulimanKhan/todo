FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN cd frontend && bun install --frozen-lockfile && bun run build
EXPOSE 4000
ENTRYPOINT ["bun", "run", "backend/server.js"]