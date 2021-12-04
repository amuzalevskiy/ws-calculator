FROM node:14.3.0-alpine 

RUN apk add --no-cache git openssh tar curl

COPY --chown=node:node ./ /frontend

# RUN git config --global url."https://gitlab-ci-token:$CI_JOB_TOKEN@sandbox.io".insteadOf ssh://git@sandbox.io:2221

WORKDIR /frontend

RUN npm i && REACT_APP_HOST=ws-calculator.sandbox.io REACT_APP_PORT=443 npm run build

# HEALTHCHECK --interval=5s --timeout=10s --retries=3 CMD curl -sS 127.0.0.1:3000 || exit 1

CMD REACT_APP_HOST=localhost REACT_APP_PORT=2027 npm run server
