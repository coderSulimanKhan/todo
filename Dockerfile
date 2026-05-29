FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
RUN cd frontend && bun install
COPY . .
EXPOSE 4000
ENTRYPOINT ["bun", "run", "backend/server.js"]