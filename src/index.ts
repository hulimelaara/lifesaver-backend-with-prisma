import expressConfig from "./config/expressConfig"

import { logger } from "./utils/logger"
import config from "./config/environment"

const log = logger("server")

const app = expressConfig()

app.listen(config.port, () => {
    console.log(`Server is running on Port ${config.port}`)
    log.info(`Server is running on Port ${config.port}`)
})
