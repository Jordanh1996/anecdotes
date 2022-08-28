import { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel, Options } from 'amqplib';
import config from 'config';
import { evidenceTransformerV1Handler } from './queues/evidence-transformer/v1/handler';
import { errorHandler } from './utils/rmq-errors';

export const queueConfig = config.get<{ name: string; prefetchCount: number }>(
  'amqp.queues.evidence-transformer-v1'
);

export function startQueues(channel: ChannelWrapper) {
  return channel.addSetup((confirmChannel: ConfirmChannel) => {
    const deadLetterQueueName = `${queueConfig.name}-dead-letter`;
    const deadLetterExchangeName = `${deadLetterQueueName}-exchange`;
    const exchangeName = `${queueConfig.name}-exchange`;

    const promises: any[] = [];

    promises.push(
      confirmChannel.assertExchange(deadLetterExchangeName, 'topic', { durable: true })
    );
    promises.push(confirmChannel.assertQueue(deadLetterQueueName, { durable: true }));
    promises.push(
      confirmChannel.bindQueue(deadLetterQueueName, deadLetterExchangeName, deadLetterQueueName)
    );
    promises.push(confirmChannel.assertExchange(exchangeName, 'topic', { durable: true }));
    promises.push(
      confirmChannel.assertQueue(queueConfig.name, <Options.AssertQueue>{
        durable: true,
        deadLetterExchange: deadLetterExchangeName,
        deadLetterRoutingKey: deadLetterQueueName,
      })
    );
    promises.push(confirmChannel.bindQueue(queueConfig.name, exchangeName, queueConfig.name));
    promises.push(confirmChannel.consume(queueConfig.name, errorHandler(evidenceTransformerV1Handler)));
    promises.push(confirmChannel.prefetch(queueConfig.prefetchCount));

    return Promise.all(promises);
  });
}
