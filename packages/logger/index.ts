import pino, { Logger } from "pino";

const logger: Logger = pino({ level: "warn" });

export default logger;
