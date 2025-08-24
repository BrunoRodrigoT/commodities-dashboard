# -------- BUILDER --------
FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Set NextAuth environment variables for build
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=U4OgOnuYLudf0gfArDK+yJsp5ZuJ1pQ1X65Ho3ZEuW0
ENV NEXT_PUBLIC_API_URL=http://localhost:3333

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# -------- RUNNER --------
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
