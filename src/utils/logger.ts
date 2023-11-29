import bunyan from "bunyan"
import config from "../config/environment"

export const logger = (fileName: string) => {
    const logger = bunyan.createLogger({
        name: fileName,
        env: config.env || "local",
        serializers: bunyan.stdSerializers,
        src: true
    })
    return logger
}
