# Prisma Module

## Owns

The Prisma module owns database access setup.

It provides the Prisma client so other modules can read and write data.

## Examples

- PrismaService
- database connection
- Prisma dependency injection

## Does Not Own

- business rules
- purchase approval logic
- transaction status rules
- billing rules
- customer ownership decisions

## Rule

Prisma talks to the database.

Business modules decide what should happen.
