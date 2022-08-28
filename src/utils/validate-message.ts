import { ConsumeMessage } from 'amqplib';
import Joi from 'joi';
import { RMQChannel } from '../connections/rmq';
import { logger } from '../logger';
import { RMQError } from './rmq-errors';

export function validateMessage<T>(
  consumeMessage: ConsumeMessage,
  parsed: T,
  schema: Joi.Schema
): void {
  const { error: errors } = schema.validate(parsed);

  if (errors) {
    const reason = 'Invalid message properties';
    const err = new Error(JSON.stringify(errors));
    logger.error(err, reason);

    throw new RMQError(consumeMessage, err, false, false);
  }
}
