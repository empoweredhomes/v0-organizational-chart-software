-- Create sub-departments under Commercial Team
INSERT INTO departments (name, color) VALUES ('Utility', '#EF4444') ON CONFLICT DO NOTHING;
INSERT INTO departments (name, color) VALUES ('Retail', '#6B7280') ON CONFLICT DO NOTHING;
INSERT INTO departments (name, color) VALUES ('E-Commerce', '#6B7280') ON CONFLICT DO NOTHING;
INSERT INTO departments (name, color) VALUES ('Data and Commercial Planning', '#F59E0B') ON CONFLICT DO NOTHING;
INSERT INTO departments (name, color) VALUES ('Mysa HQ Sales', '#818CF8') ON CONFLICT DO NOTHING;
INSERT INTO departments (name, color) VALUES ('Channel Support', '#8B5CF6') ON CONFLICT DO NOTHING;

-- Utility (3): Mark Smit, Nicole Duffett, Elizabeth Somolu
UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Utility')
WHERE last_name = 'Smit' AND first_name = 'Mark';

UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Utility')
WHERE last_name = 'Duffett' AND first_name = 'Nicole';

UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Utility')
WHERE last_name = 'Somolu' AND first_name = 'Elizabeth';

-- Retail (2): Nico Boehme + Channel Support sub-dept for Jennifer Collins
UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Retail')
WHERE last_name = 'Boehme' AND first_name = 'Nico';

UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Channel Support')
WHERE last_name = 'Collins' AND first_name = 'Jennifer';

-- E-Commerce (2): Frank Nie, Kar-Wing Lo
UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'E-Commerce')
WHERE last_name = 'Nie';

UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'E-Commerce')
WHERE last_name = 'Lo' AND first_name = 'Kar-Wing';

-- Data and Commercial Planning (1): Megan Cooze
UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Data and Commercial Planning')
WHERE last_name = 'Cooze' AND first_name = 'Megan';

-- Mysa HQ Sales (3): Brookes Shean, Zuber Ahmed, David Murray
UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Mysa HQ Sales')
WHERE last_name = 'Shean' AND first_name = 'Brookes';

UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Mysa HQ Sales')
WHERE last_name = 'Ahmed' AND first_name = 'Zuber';

UPDATE employees SET department_id = (SELECT id FROM departments WHERE name = 'Mysa HQ Sales')
WHERE last_name = 'Murray' AND first_name = 'David';

-- David Murray reports to Brookes Shean (not directly to Alexandre)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Brookes' AND last_name = 'Shean')
WHERE first_name = 'David' AND last_name = 'Murray';

-- Cole Inkpen + Leah Sexton stay in Commercial Team (no specific sub-dept in the screenshot)
-- They're already in Commercial Team, which is fine.

-- Fix Frank Nie's title: "ECommerce Lead" -> "E-Commerce Lead"
UPDATE employees SET job_title = 'E-Commerce Lead'
WHERE last_name = 'Nie' AND job_title = 'ECommerce Lead';
