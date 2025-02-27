import pino, { Logger } from "pino";

const logger: Logger = pino({ level: "error" });

export default logger;
