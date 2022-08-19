import { z } from 'zod';

/**
 * #### Summary
 * Describes the structure of hardhat_contracts.json
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export type TDeployedHardhatContractsJson = z.infer<typeof deployedHardhatContractsJsonSchema>;

/**
 * #### Summary
 * Zod Schema for {@link TBasicContractMap}
 */
export const deployedHardhatContractsJsonSchema = z.record(
  z.union([z.string(), z.number()], { description: 'chainId' }).transform((s) => parseInt(s.toString())),
  z
    .object({
      name: z.string({ description: 'contractName' }),
      chainId: z.string({ description: 'chainId' }),
      contracts: z.record(
        z.string({ description: 'contractName' }),
        z.object({
          address: z.string(),
          abi: z.array(z.any()).optional(),
        })
      ),
    })
    .array()
);
