import { ConsumeMessage } from 'amqplib';
import { logger } from '../logger';
import { RMQError } from './rmq-errors';

export const messageParser = <T>(msg: ConsumeMessage): T => {
  try {
    return JSON.parse(msg.content.toString());
  } catch (err: any) {
    const reason = 'Failed to parse message';
    logger.error(err, reason);

    throw new RMQError(msg, err, false, false);
  }
};
