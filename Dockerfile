FROM node:16-alpine AS node

FROM alpine:3.14

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN apk update

RUN apk add git

#install node, npm, yarn
RUN apk add --no-cache npm yarn

WORKDIR /app