import { Prisma } from '@prisma/client';

export function getSqlQueryResort(values: string): Prisma.Sql {
  return Prisma.sql`
        UPDATE image AS i
        SET order_index = x.order_index
        FROM (VALUES ${Prisma.raw(values)}) AS x (id, order_index)
        WHERE i.id = x.id
    `;
}
