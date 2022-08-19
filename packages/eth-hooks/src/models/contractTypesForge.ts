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
  hash: string | null;
  transactionType: 'CREATE' | Omit<string, 'CREATE'>;
  contractName: string;
  contractAddress: string;
  function: string | null;
  arguments: string | null;
  transaction: TForgeTransactionData;
};

export const forgeTransactionSchema: ZodType<TForgeTransaction> = z.object({
  hash: z.string().nullable(),
  transactionType: z.string(),
  contractName: z.string(),
  contractAddress: z.string(),
  function: z.string().nullable(),
  arguments: z.string().nullable(),
  transaction: forgeTransactionDataSchema,
});

export type TForgeBroadcastJson = {
  transactions: TForgeTransaction[];
};

export type TForgeDeploymentBroadcastCollection = {
  [chainId: number]: TForgeBroadcastJson;
};

export const forgeDeploymentBroadcastCollectionSchema: ZodType<TForgeDeploymentBroadcastCollection> = z.record(
  z.union([z.number(), z.string()], { description: 'chainId' }).transform((t) => parseInt(t as string)),
  z.object({
    transactions: z.array(forgeTransactionSchema),
  })
);
