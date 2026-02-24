-- Fix reporting lines: Joshua Green should have 7 direct reports
-- Tamer Shafik, Sharon Janes, and Joey Kim need to report directly to Joshua

-- 1. Move Tamer Shafik from Zachary Green -> Joshua Green
UPDATE employees
SET manager_id = (SELECT id FROM employees WHERE first_name = 'Joshua' AND last_name = 'Green')
WHERE first_name = 'Tamer' AND last_name = 'Shafik';

-- 2. Create Product Management department for Sharon and Joey
INSERT INTO departments (name, color)
VALUES ('Product Management', '#8B5CF6')
ON CONFLICT DO NOTHING;

-- 3. Move Sharon Janes: report to Joshua Green, department = Product Management
UPDATE employees
SET manager_id = (SELECT id FROM employees WHERE first_name = 'Joshua' AND last_name = 'Green'),
    department_id = (SELECT id FROM departments WHERE name = 'Product Management')
WHERE first_name = 'Sharon' AND last_name = 'Janes';

-- 4. Move Joey Kim: report to Joshua Green, department = Product Management
UPDATE employees
SET manager_id = (SELECT id FROM employees WHERE first_name = 'Joshua' AND last_name = 'Green'),
    department_id = (SELECT id FROM departments WHERE name = 'Product Management')
WHERE first_name LIKE '%Joey%' AND last_name = 'Kim';
