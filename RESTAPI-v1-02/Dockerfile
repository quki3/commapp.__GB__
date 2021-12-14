FROM node:16

WORKDIR /RESTAPI-v1-02

COPY ["package.json","package-lock.json","."]

RUN npm install


COPY [".", "."] 

EXPOSE 3000

CMD ["npm","run","dev"]


