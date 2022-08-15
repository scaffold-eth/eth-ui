import { z, ZodType } from 'zod';

export type TForgeTransactionData = z.infer<typeof forgeTransactionDataSchema>;
export const forgeTransactionDataSchema = z.object({
  type: z.string(),
  from: z.string(),
  gas: z.string(),
  value: z.string(),
  data: z.string(),
  nonce: z.string(),
  accessList: z.array(z.string()),
});

export type TForgeTransaction = {
  hash: string;
  transactionType: 'CREATE' | Omit<string, 'CREATE'>;
  contractName: string;
  contractAddress: string;
  function: string;
  arguments: string;
  transaction: TForgeTransactionData;
};

export const forgeTransactionSchema: ZodType<TForgeTransaction> = z.object({
  hash: z.string(),
  transactionType: z.string(),
  contractName: z.string(),
  contractAddress: z.string(),
  function: z.string(),
  arguments: z.string(),
  transaction: forgeTransactionDataSchema,
});

export type TForgeBroadcastJson = {
  transactions: TForgeTransaction[];
};

export type TForgeBoradcastCollection = {
  [chainId: number]: TForgeBroadcastJson;
};

export const forgeBoradcastCollectionSchema: ZodType<TForgeBoradcastCollection> = z.record(
  z.number({ description: 'chainId' }),
  z.object({
    transactions: z.array(forgeTransactionSchema),
  })
);
