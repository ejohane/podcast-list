FROM node as build

WORKDIR /podcast-list/api

# copy over local models library
# 
# this is a workaround as normally you wouldn't use 
# a local module in a container build
RUN mkdir /podcast-list/models
COPY ./models/package.json /podcast-list/models
COPY ./models/package-lock.json /podcast-list/models
RUN npm install --prefix /podcast-list/models
COPY ./models/ /podcast-list/models
RUN npm run build --prefix /podcast-list/models

COPY ./api/package.json .
COPY ./api/package-lock.json .

RUN npm install

COPY ./api .

RUN npm run build

EXPOSE 8081

CMD ["node", "."]