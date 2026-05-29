FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
EXPOSE 4000
ENTRYPOINT ["bun", "run", "backend/server.js"]