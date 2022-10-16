up:
	@npm run dev

db-init:
	@sqlite3 database/dev.db < database/schema.sql
	@sqlite3 database/dev.db < database/init-data.sql

db-cli:
	@sqlite3 database/dev.db

format:
	@npm run format

