-- Audit fix: leave status for employees on leave per org chart
-- Nico Boehme - Parental Leave
UPDATE employees SET is_on_leave = true, leave_note = 'Parental Leave'
WHERE first_name = 'Nico' AND last_name = 'Boehme';

-- Nicole Duffett - Maternity Leave
UPDATE employees SET is_on_leave = true, leave_note = 'Maternity Leave'
WHERE first_name = 'Nicole' AND last_name = 'Duffett';

-- Melanie Kung - Maternity Leave
UPDATE employees SET is_on_leave = true, leave_note = 'Maternity Leave'
WHERE first_name = 'Melanie' AND last_name = 'Kung';

-- Mira Chaya - Maternity Leave
UPDATE employees SET is_on_leave = true, leave_note = 'Maternity Leave'
WHERE first_name = 'Mira' AND last_name = 'Chaya';

-- Fix Alejandro Castanon -> Castañon (with ñ)
UPDATE employees SET last_name = 'Castañon',
  email = 'alejandro.castanon@getmysa.com'
WHERE first_name = 'Alejandro' AND last_name = 'Castanon';
