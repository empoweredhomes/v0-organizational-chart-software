-- Add password_hash column to employees table
ALTER TABLE employees ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_employee_id ON sessions(employee_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- Set a default password for all employees (password: "mysa2026")
-- In production, employees would reset their password on first login
UPDATE employees SET password_hash = '$2b$10$LQ8V5pYVmMxOGKnVJz5aHuFqRv7mTOGGNbGq8K0K1GLUA2zRxTJ1e';
