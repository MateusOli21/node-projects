import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export async function createPostgresConnection(): Promise<Connection> {
  const postgresConnectionOptions = await getConnectionOptions();

  const connectionConfigs = {
    host: 'database',
    username: 'docker',
    password: 'postgres',
    database: 'rentx',
    port: 5432,
  };

  const connectionOptions = Object.assign(
    postgresConnectionOptions,
    connectionConfigs
  );

  return createConnection(connectionOptions);
}
