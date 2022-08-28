# Anecdotes

Important Notes: The assignment was either way to long, or I possibly just didn't understand it correctly

Either way, at some point I "ditched" it because it was to time-consuming.

I've implemented an API to handle database queries, and to receive a request for scraping,
and also a RabbitMQ consumer to do the crawling, and make the system more scalable.

Given more time I could make the solution better.

## Technologies

For the API I've used Typescript + TypeORM + PostgreSQL + Express

For the crawling I've created a RabbitMQ consumer.

Note: I've bearly started implementing the Client Side, you may ignore it

## Development setup

In order to setup development you'd need PostgreSQL and RabbitMQ running on your host machine.

I've personally used the docker-compose file you can find in this directory, it's an easy setup

You'd need to have Docker locally to use that.

If you do you can use the shell script in this directory. You may need executable permissions in order to run it directly,
so you can change the permission using:

```bash
chmod +x start-docker.sh
```

I've added more development setup for each service since they are designed to be independent (even though speaking with each other via http or amqp they are somewhat dependent)

## Architecture

The system is made of the following components:

- An HTTP API with a private PostgreSQL DB. [Database table design](https://dbdiagram.io/d/611643dd2ecb310fc3ca318a).
- A RabbitMQ Consumer that crawls over the urls.
- A client side application built with react for user friendly operations on the system

[Architecture diagram](https://drive.google.com/file/d/1Bec-Awm-hfFFbOmZmE25amDAmOnreROh/view?usp=sharing)

Note: diagrams made with draw.IO, I usually like to embed them in confluence, but here I can only share an image.

### System operations:

- [Scrape a URL](https://drive.google.com/file/d/1VgMfNKvgJGA1iFUrUWvIa2rSSg0J4LDl/view?usp=sharing)
- Get scrape requests
- Get scrape request crawled urls for a given parent (in the UI we shuold be able to see a tree like structure where we can each time open a different "sub tree")

I'm to lazy to make more diagrams at this point