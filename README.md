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

To run the migration:

```bash
bun run start
```

The migration process will:

1. Check if the 'vacatureland-old' database exists
2. Create it from the dump file if it doesn't exist
3. Create a new 'vacatureland-old-mapped' database
4. Apply table and column mappings
5. Generate two SQL dumps:
   - `original_data.sql`: Original database dump
   - `cleaned_data.sql`: Transformed database dump with new structure
