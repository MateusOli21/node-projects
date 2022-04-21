import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export async function createPostgresConnection(
  host = 'database'
): Promise<Connection> {
  const postgresConnectionOptions = await getConnectionOptions();

  const connectionConfigs = {
    host,
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
