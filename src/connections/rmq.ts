import amqp from 'amqp-connection-manager';
import { Options } from 'amqplib';
import config from 'config';

const connectionConfig = config.get<Options.Connect>('amqp.connection');

// Note that amqp-connection-manager takes care of the connection and does not return a Promise
export const RMQConnection = amqp.connect([connectionConfig]);

export const RMQChannel = RMQConnection.createChannel({
  json: true,
});
