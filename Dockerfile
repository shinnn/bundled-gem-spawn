FROM node:onbuild
RUN apt-get update && apt-get install -y ruby ruby-dev && rm -rf /var/lib/apt/lists/*
RUN gem install bundler --no-document
RUN bundle install
