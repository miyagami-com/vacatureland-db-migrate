# Vacatureland Database Migration Tool

This tool is designed to migrate and transform data from an old database structure to a new one, specifically for the Vacatureland project. It handles table renaming, column mapping, and creates SQL dumps of both original and transformed data.

## Prerequisites

- Node.js/Bun runtime `curl -fsSL https://bun.sh/install | bash`
- PostgreSQL (psql and pg_restore commands should be available in your terminal)
- PostgreSQL server running locally
- Default PostgreSQL credentials (can be modified in the code or via environment variables):
  - Username: postgres
  - Password: postgres
  - Host: localhost
  - Port: 5432

## Usage

Have the db you got from devs ready in a psql db called `vacatureland-old` or put the dump file in the root of the project, it's name should be `database.dump`.

To run the migration:

```bash
bun run start
```

