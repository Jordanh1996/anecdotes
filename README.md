# Anecdotes

I used RabbitMQ as a queue, we get messages from an exchange called evidence-transformer-v1-exchange

The parsing config can be found on config/default.json

## Development setup


1. Install dependencies:

Run:
```bash
npm i
```

2. In order to setup development you'd need RabbitMQ running on your host machine.

I've personally used the docker-compose file you can find in this directory, it's an easy setup

You'd need to have Docker locally to use that.

If you do you can use the shell script in this directory. You may need executable permissions in order to run it directly,
so you can change the permission using:

```bash
chmod +x start-docker.sh
```

```bash
./start-docker.sh
```

3. For dev:
```bash
npm run start:dev
```

Watch files:
```bash
npm run start:watch
```
