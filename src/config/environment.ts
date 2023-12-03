import dotenv from "dotenv"

dotenv.config()

enum Environment {
    Local = "local",
    Development = "development",
    Production = "production"
}

enum DatabaseType {
    Postgres = "postgres",
    MySQL = "mysql",
    MariaDB = "mariadb",
    SQLite = "sqlite",
    MSSQL = "mssql",
    Oracle = "oracle"
}

type DatabaseConfig = {
    username: string
    password: string
    database: string
    host: string
    dialect: DatabaseType
    port: number | undefined
}

type EnvironmentConfig = {
    env: Environment
    port: string | number
    database: {
        [Environment.Local]?: DatabaseConfig
        [Environment.Development]?: DatabaseConfig
        [Environment.Production]?: DatabaseConfig
    }
}

const environmentValues: EnvironmentConfig = {
    env: (process.env.NODE_ENV as Environment) || Environment.Local,
    port: process.env.PORT || 3001,
    database: {
        [Environment.Local]: {
            username: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_DATABASE as string,
            host: process.env.DB_HOST as string,
            dialect: process.env.DB_DIALECT as DatabaseType,
            port: Number(process.env.DB_PORT)
        },
        [Environment.Development]: {
            username: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_DATABASE as string,
            host: process.env.DB_HOST as string,
            dialect: process.env.DB_DIALECT as DatabaseType,
            port: Number(process.env.DB_PORT)
        },
        [Environment.Production]: {
            username: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            database: process.env.DB_DATABASE as string,
            host: process.env.DB_HOST as string,
            dialect: process.env.DB_DIALECT as DatabaseType,
            port: Number(process.env.DB_PORT)
        }
    }
}

const getSanitzedConfig = (config: EnvironmentConfig) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`)
        }
    }
    return config
}

const sanitizedConfig = getSanitzedConfig(environmentValues)

export default sanitizedConfig
