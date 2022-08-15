import { z } from 'zod';

export const forgeTransactionDataSchema = z.object({
  type: z.string(),
  from: z.string(),
  gas: z.string(),
  value: z.string(),
  data: z.string(),
  nonce: z.string(),
  accessList: z.array(z.string()),
});

export const forgeTransactionSchema = z.object({
  hash: z.string(),
  transactionType: z.enum(['CREATE']),
  contractName: z.string(),
  contractAddress: z.string(),
  function: z.string(),
  arguments: z.string(),
  transaction: forgeTransactionDataSchema,
});

export const forgeBroadcastSchema = z.object({
  transactions: z.array(forgeTransactionSchema),
});

export type TForgeTransactionData = z.infer<typeof forgeTransactionDataSchema>;

export type TForgeTransaction = z.infer<typeof forgeTransactionSchema>;

export type TForgeBroadcast = z.infer<typeof forgeBroadcastSchema>;
