FROM public.ecr.aws/lambda/nodejs:18
RUN npm install --global yarn
COPY ./package.json ./yarn.lock ./
RUN yarn install --production --frozen-lockfile --non-interactive
COPY ./ ./
RUN yarn build
