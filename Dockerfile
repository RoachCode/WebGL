# syntax=docker/dockerfile:1
   
FROM node:18-alpine
COPY . .
RUN yarn install --production
CMD ["node", "webgl-engine.js"]
EXPOSE 3000
