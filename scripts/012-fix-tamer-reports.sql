-- Fix Tamer Shafik's direct reports to match org chart (14 direct reports)
-- Currently has 6, needs: Shikan Yue, Peter Woodman, John Hawley, Mark Simms,
-- Sadaf Mozaffari, Adam Lichter, Brandon Bemister, Steve O'Keefe, Stephen Piercey,
-- Esteban Ricalde-Gonzalez, Graham Smith, Adam Paul, Zachary Coffey
-- Plus one more to reach 14

-- Move Douglas (Mark) Simms to report directly to Tamer (currently reports to John Hawley)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Douglas (Mark)' AND last_name = 'Simms';

-- Move Sadaf Mozaffari to report directly to Tamer (currently reports to John Hawley)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Sadaf' AND last_name = 'Mozaffari';

-- Move Adam Lichter to report directly to Tamer (currently reports to Brandon Bemister)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Adam' AND last_name = 'Lichter';

-- Move John Hawley to report directly to Tamer (currently reports to Peter Woodman)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'John' AND last_name = 'Hawley';

-- Move Graham Smith to report directly to Tamer (currently reports to Esteban)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Graham' AND last_name = 'Smith';

-- Move Adam Paul to report directly to Tamer (currently reports to Esteban)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Adam' AND last_name = 'Paul';

-- Move Zachary Coffey to report directly to Tamer (currently reports to Esteban)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'Zachary' AND last_name = 'Coffey';

-- Move David Murray to report directly to Tamer (he may be the 14th report)
UPDATE employees SET manager_id = (SELECT id FROM employees WHERE first_name = 'Tamer' AND last_name = 'Shafik')
WHERE first_name = 'David' AND last_name = 'Murray';
