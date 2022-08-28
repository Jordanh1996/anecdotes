import { RMQChannel } from './connections/rmq';
import { logger } from './logger';
import { startQueues } from './start-queues';

async function main() {
  try {
    await RMQChannel.waitForConnect();
  } catch (err) {
    logger.error(err, 'Failed to connect to RMQ');
  }

  try {
    await startQueues(RMQChannel);
  } catch (err) {
    logger.error(err, 'Failed to assert and consume queue');
  }

  logger.info('Queues has been asserted and are being consumed');
}

main();
