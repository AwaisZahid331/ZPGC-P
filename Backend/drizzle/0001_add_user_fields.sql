-- Add new fields to users table
ALTER TABLE users ADD COLUMN cnic VARCHAR(20);
ALTER TABLE users ADD COLUMN program VARCHAR(50);
ALTER TABLE users ADD COLUMN semester VARCHAR(20);
ALTER TABLE users ADD COLUMN batch VARCHAR(20);
ALTER TABLE users ADD COLUMN address TEXT;
ALTER TABLE users ADD COLUMN verification_token VARCHAR(255);
ALTER TABLE users ADD COLUMN token_expires TIMESTAMP;
