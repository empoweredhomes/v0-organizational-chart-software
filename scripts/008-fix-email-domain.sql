-- Update all employee emails from @mysa.com to @getmysa.com
UPDATE employees
SET email = REPLACE(email, '@mysa.com', '@getmysa.com'),
    updated_at = NOW()
WHERE email LIKE '%@mysa.com';
