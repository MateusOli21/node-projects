import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { createPostgresConnection } from '..';

async function createAdmin() {
  const connection = await createPostgresConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `
      INSERT INTO USERS(id, name, username, email, password, "isAdmin", "driverLicense", created_at)
        values('${id}', 'admin', 'admin', 'admin@test.com', '${password}', true, 'XXX-XXXX', 'now()')
    `
  );

  connection.close();
}

createAdmin();
