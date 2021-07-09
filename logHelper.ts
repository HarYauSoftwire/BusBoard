import log4js, { configure } from "log4js";

export const logger = log4js.getLogger();

configure ({
    appenders: {
        file: { type: "file", filename: "logs/log.log" },
        console: { type: "stdout" }
    },
    categories: {
        default: {
            appenders: ["file", "console"],
            level: "info"
        }
    }
});