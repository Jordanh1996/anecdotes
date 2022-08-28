import Joi from 'joi';

const securityV1Schema = Joi.object({
  mfa_enabled: Joi.boolean().required(),
  mfa_enforced: Joi.boolean().required(),
});

interface SecurityV1 {
  mfa_enabled: boolean;
  mfa_enforced: boolean;
}

const userDetailsV1Schema = Joi.object({
  id: Joi.number().integer().required(),
  email: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  updated_at: Joi.date().iso().required(),
});

interface UserDetailsV1 {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  updated_at: string; // ISO string
}

const evidenceDataV1Schema = Joi.object({
  login_name: Joi.string().required(),
  role: Joi.string().required(),
  user_details: userDetailsV1Schema.required(),
  security: securityV1Schema.required(),
});

interface EvidenceDataV1 {
  login_name: string;
  role: string;
  user_details: UserDetailsV1;
  security: SecurityV1;
}

export const evidenceTransformerV1Schema = Joi.object({
  evidence_id: Joi.number().integer().required(),
  evidence_data: Joi.array().items(evidenceDataV1Schema.required()).min(1).required(),
}).required();

export interface EvidenceTransformerV1 {
  evidence_id: number;
  evidence_data: EvidenceDataV1[];
}
