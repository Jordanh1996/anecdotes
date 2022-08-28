import config from 'config';
import { createTransformerFunction } from '../../../parsing';
import { EvidenceTransformerV1 } from './schemas';

const parsingConfig = config.get<Record<string, string>>('parsing-configs.evidence-transformer-v1');

export const evidenceTransformerV1 = createTransformerFunction(parsingConfig);

export function evidenceTransformerListV1(
  evidenceData: EvidenceTransformerV1['evidence_data']
) {
  return evidenceData.map((data) => evidenceTransformerV1(data));
}
