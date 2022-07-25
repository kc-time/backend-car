import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export async function DatabaseConnectionLoader (
): Promise<Connection> {
  // Use snake case naming for MySQL
  const connectionOptions = await getConnectionOptions();
  Object.assign(connectionOptions, { namingStrategy: new SnakeNamingStrategy() });

  const connection: Connection = await createConnection(connectionOptions);
  console.log("[database] connected", connection.name);

  return connection;
}
