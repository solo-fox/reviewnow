import logger from "@workspace/logger";
import type ServerActionReturn from "@/_types/server-actions";

export default async function serverAction<T>(
  fn: () => Promise<ServerActionReturn<T>>
): Promise<ServerActionReturn<T>> {
  let returnData: ServerActionReturn<T>;

  try {
    returnData = await fn();
    if (!returnData.success) {
      logger.error(returnData.error);
      throw new Error(returnData.error);
    }
  } catch (error) {
    logger.error(error instanceof Error ? error.message : "Unexpected error");
    throw error;
  }
  
  return returnData;
}
