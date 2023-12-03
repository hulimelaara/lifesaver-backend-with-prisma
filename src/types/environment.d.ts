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

export { Environment, DatabaseType, DatabaseConfig, EnvironmentConfig }
