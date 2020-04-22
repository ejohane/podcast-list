FROM node as build

WORKDIR /podcast-list/app

# copy over local models file
# 
# this is a workaround as normally you wouldn't use 
# a local module in a container build
RUN mkdir /podcast-list/models
COPY ./models/package.json /podcast-list/models
COPY ./models/package-lock.json /podcast-list/models
RUN npm install --prefix /podcast-list/models
COPY ./models/ /podcast-list/models
RUN npm run build --prefix /podcast-list/models

COPY ./app/package.json .
COPY ./app/package-lock.json .

RUN npm install

COPY ./app .

RUN npm run build

FROM node as prod
 
WORKDIR /app

RUN npm install -g serve

COPY --from=build /podcast-list/app/build .

EXPOSE 5000

CMD ["serve", "-s", "."]