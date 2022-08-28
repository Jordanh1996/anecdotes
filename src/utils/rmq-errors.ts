import { ConsumeMessage, Message } from 'amqplib';
import { RMQChannel } from '../connections/rmq';
import { logger } from '../logger';

export class RMQError extends Error {
  rmqMessage: Message;
  originalError?: Error;

  constructor(
    rmqMessage: Message,
    originalErrorOrMessage: Error | string,
    allUpTo: boolean,
    requeue: boolean
  ) {
    const isOriginalError = !(typeof originalErrorOrMessage === 'string');
    const message =
      isOriginalError && 'message' in originalErrorOrMessage
        ? originalErrorOrMessage.message
        : originalErrorOrMessage;

    super(message);

    this.rmqMessage = rmqMessage;
    if (isOriginalError) {
      this.originalError = originalErrorOrMessage;
    }

    RMQChannel.nack(rmqMessage, allUpTo, requeue);
  }
}

export function errorHandler(handler: Function) {
  return async (msg: ConsumeMessage | null) => {
    try {
      await handler(msg);

      if (msg) {
        RMQChannel.ack(msg);
      }
    } catch (err: unknown) {
      logger.error(err, 'Failed to handle queue message');

      if (msg && !(err instanceof RMQError)) {
        RMQChannel.nack(msg, false, false);
      }
    }
  };
}
