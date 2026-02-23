-- Fix: Allow department_id to be NULL for top-level executives (CEO, COO)
ALTER TABLE employees ALTER COLUMN department_id DROP NOT NULL;
