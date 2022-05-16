
# We will define nodejs version
FROM node:15

# all the commands will run inside this directory
# Specifying the working directory
WORKDIR /app

# install dependencies in our working directory
COPY package.json .

# to run a command in side docker
# this will run while building the image
# RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
ENV PORT 3000
# we did copy package.json and then copy all1
EXPOSE $PORT
# this will run at the run time
CMD [ "node","index.js" ]

