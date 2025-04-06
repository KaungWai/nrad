FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    curl \
    nano \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /

CMD ["bash", "-l"]
