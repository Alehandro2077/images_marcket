import { PrismaClient } from '@prisma/client';
import { Client } from 'pg';
const prisma = new PrismaClient();
async function main() {
  const creatorRole = await prisma.role.create({
    data: { role: 'creator' },
  });

  const supplierRole = await prisma.role.create({
    data: { role: 'supplier' },
  });

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const createFunctionAndTrigger = `
  CREATE OR REPLACE FUNCTION set_image_order()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.order_index := (
      SELECT COALESCE(MAX(order_index), 0) + 1
      FROM "Image"
      WHERE project_id = NEW.project_id
    );
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_image_order_trigger
BEFORE INSERT ON "Image"
FOR EACH ROW
EXECUTE FUNCTION set_image_order();
  `;

  await client.query(createFunctionAndTrigger);

  await client.end();

  console.log({ creatorRole, supplierRole });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
