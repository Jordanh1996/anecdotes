import { ConsumeMessage } from 'amqplib';
import { logger } from '../../../logger';
import { messageParser } from '../../../utils/message-parser';
import { validateMessage } from '../../../utils/validate-message';
import { evidenceTransformerListV1 } from './parsing';
import { EvidenceTransformerV1, evidenceTransformerV1Schema } from './schemas';

export async function evidenceTransformerV1Handler(msg: ConsumeMessage | null) {
  if (!msg) {
    logger.error('Received empty message');
    return;
  }

  logger.debug(
    { message: msg.content.toString() },
    'A message has been received on evidence-transformer-v1 queue'
  );

  const msgBody = messageParser<EvidenceTransformerV1>(msg);

  validateMessage(msg, msgBody, evidenceTransformerV1Schema);

  const transformed = evidenceTransformerListV1(msgBody.evidence_data);

  console.table(transformed);

  logger.debug(msgBody, 'A message in evidence-transformer-v1 has been processed successfully');
}
