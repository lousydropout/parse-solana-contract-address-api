import { PublicKey, Transaction } from "@solana/web3.js";

const systemProgramId = "11111111111111111111111111111111" as const;
const knownProgramPrefixes = [
  "ComputeBudget",
  "Stake",
  "BPFLoader",
  "Token",
] as const;

/**
 * Checks if the given programId is a contract by first checking known system programs and patterns.
 * If it doesn't match any known system patterns, it is assumed to be a contract address.
 *
 * @param programId - The programId to check
 * @returns boolean - True if it's a contract, false if it's a system program or non-executable
 */
const isContractAddress = (programId: string): boolean => {
  try {
    // Check if the programId is a valid PublicKey (throws exception if it is not)
    new PublicKey(programId);

    // Check if the programId is the system program (all 1s)
    if (programId === systemProgramId) return false;

    // Check if the programId starts with specific known program patterns
    for (const prefix of knownProgramPrefixes) {
      if (programId.startsWith(prefix)) return false;
    }

    // Additional checks can be made here, such as verifying the program's existence on-chain
    // For simplicity, we'll assume it's a contract if it does not follow the known patterns
    // of non-contract programs IDs
    return true;
  } catch (error) {
    // If the programId is not a valid PublicKey, it is not a contract
    return false;
  }
};

/**
 * Extracts the contract address from a Solana transaction.
 *
 * @param tx - The base64 encoded transaction string.
 * @returns {{found, programId}} An object containing a boolean indicating
 * if a contract address was found, and the program ID of the contract
 * address if found.
 */
export const getContractAddress = (
  tx: string
): { found: boolean; programId: string } => {
  try {
    const buffer = Buffer.from(tx, "base64");
    const transaction = Transaction.from(buffer);

    for (const instruction of transaction.instructions) {
      const programId = instruction.programId.toBase58();
      const found = isContractAddress(programId);

      if (found) return { found, programId };
    }

    // If no contract address was found, return false
    return { found: false, programId: "" };
  } catch (error) {
    // If the transaction is invalid, return false
    return { found: false, programId: "" };
  }
};
