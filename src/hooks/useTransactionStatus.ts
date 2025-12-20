import { useWaitForTransactionReceipt } from "wagmi";

export function useTransactionStatus(
  txHash: `0x${string}` | undefined,
  rwaTxHash: `0x${string}` | undefined,
  tokenizationEnabled: boolean
) {
  const { data: receipt, isLoading: isWaitingReceipt } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { data: rwaReceipt, isLoading: isWaitingRwaReceipt } = useWaitForTransactionReceipt({
    hash: rwaTxHash,
  });

  const isFullySuccessful = tokenizationEnabled 
    ? (receipt?.status === "success" && rwaReceipt?.status === "success")
    : (receipt?.status === "success");

  return { 
    receipt, 
    rwaReceipt, 
    isFullySuccessful,
    isWaitingReceipt,
    isWaitingRwaReceipt
  };
}