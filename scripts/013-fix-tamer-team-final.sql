-- Fix Tamer Shafik's direct reports to match org chart exactly (14 direct reports)

-- 1. Move David Murray back to Commercial Team under Alexandre Louis (CRO)
UPDATE employees 
SET manager_id = (SELECT id FROM employees WHERE first_name = 'Alexandre' AND last_name = 'Louis'),
    department_id = (SELECT id FROM departments WHERE name = 'Commercial Team')
WHERE first_name = 'David' AND last_name = 'Murray';

-- 2. Move John Hawley to report to Peter Woodman (Architecture Team)
UPDATE employees 
SET manager_id = (SELECT id FROM employees WHERE first_name = 'Peter' AND last_name = 'Woodman')
WHERE first_name = 'John' AND last_name = 'Hawley';

-- 3. Move Michael Mitchell to report directly to Tamer (not Shikan Yue)
UPDATE employees 
SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Michael' AND last_name = 'Mitchell';

-- 4. Move Javier Ortiz Castro to report directly to Tamer (not Shikan Yue)
UPDATE employees 
SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Javier' AND last_name = 'Ortiz Castro';
