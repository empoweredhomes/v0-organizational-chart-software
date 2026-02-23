-- Seed departments
INSERT INTO departments (id, name, color) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Engineering', '#3B82F6'),
  ('d1000000-0000-0000-0000-000000000002', 'Commercial Team', '#10B981'),
  ('d1000000-0000-0000-0000-000000000003', 'Customer Experience', '#F59E0B'),
  ('d1000000-0000-0000-0000-000000000004', 'Operations', '#8B5CF6'),
  ('d1000000-0000-0000-0000-000000000005', 'Finance', '#14B8A6'),
  ('d1000000-0000-0000-0000-000000000006', 'People & Culture', '#EC4899'),
  ('d1000000-0000-0000-0000-000000000007', 'IT & Security', '#6366F1')
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- EXECUTIVE LEVEL
-- ==========================================

-- CEO - Joshua Green (no manager, no department - top level)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e0000000-0000-0000-0000-000000000001', 'Joshua', 'Green', 'joshua.green@mysa.com', 'Chief Executive Officer', NULL, NULL, 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- COO - Zachary Green (reports to CEO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e0000000-0000-0000-0000-000000000002', 'Zachary', 'Green', 'zachary.green@mysa.com', 'Chief Operating Officer', NULL, 'e0000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- CRO - Alexandre Louis (reports to CEO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e0000000-0000-0000-0000-000000000003', 'Alexandre', 'Louis', 'alexandre.louis@mysa.com', 'Chief Revenue Officer', 'd1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- ENGINEERING (reports to COO via VP Engineering)
-- ==========================================

-- VP of Engineering - Tamer Shafik (reports to COO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000001', 'Tamer', 'Shafik', 'tamer.shafik@mysa.com', 'VP of Engineering', 'd1000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Principal Architect - Peter Woodman (reports to VP Eng)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000002', 'Peter', 'Woodman', 'peter.woodman@mysa.com', 'Principal Architect', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Architecture Team Lead - John Hawley (reports to Peter Woodman)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000003', 'John', 'Hawley', 'john.hawley@mysa.com', 'Software Development Team Lead', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Cloud Architect - Mark Simms (reports to John Hawley)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000004', 'Mark', 'Simms', 'mark.simms@mysa.com', 'Cloud Architect', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Intermediate Full Stack Developer - Sadf Mozaffari (reports to John Hawley)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000005', 'Sadf', 'Mozaffari', 'sadf.mozaffari@mysa.com', 'Intermediate Full Stack Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Software Development Technical Lead - Brandon Bemister (reports to VP Eng)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000006', 'Brandon', 'Bemister', 'brandon.bemister@mysa.com', 'Software Development Technical Lead', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Firmware Team Lead - Adam Lichter (reports to Brandon Bemister)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000007', 'Adam', 'Lichter', 'adam.lichter@mysa.com', 'Software Development Team Lead', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000006', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Embedded Developer - Ian Robertson (reports to Adam Lichter)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000008', 'Ian', 'Robertson', 'ian.robertson@mysa.com', 'Senior Embedded Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000007', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Intermediate Embedded Developer - Daniel Danielski (reports to Adam Lichter)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000009', 'Daniel', 'Danielski', 'daniel.danielski@mysa.com', 'Intermediate Embedded Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000007', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Junior Firmware Developer/QA - Harkirt Kaur (reports to Adam Lichter)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000010', 'Harkirt', 'Kaur', 'harkirt.kaur@mysa.com', 'Junior Firmware Developer/QA, AI Enhanced', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000007', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Junior Firmware Developer/QA - Abir Basu (reports to Adam Lichter)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000011', 'Abir', 'Basu', 'abir.basu@mysa.com', 'Junior Firmware Developer/QA, AI Enhanced', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000007', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- App Team Lead - Steve O''Keefe (reports to VP Eng)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000012', 'Steve', 'O''Keefe', 'steve.okeefe@mysa.com', 'Software Development Team Lead', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Software Developer - Meredith Mumby (reports to Steve O'Keefe)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000013', 'Meredith', 'Mumby', 'meredith.mumby@mysa.com', 'Senior Software Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000012', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Software Developer - Kim Drover (reports to Steve O'Keefe)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000014', 'Kim', 'Drover', 'kim.drover@mysa.com', 'Senior Software Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000012', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior QA Analyst - Rahul Nandkumar (reports to Steve O'Keefe)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000015', 'Rahul', 'Nandkumar', 'rahul.nandkumar@mysa.com', 'Senior QA Analyst', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000012', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Intermediate Software Developer - Siobhan Cody (reports to Steve O'Keefe)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000016', 'Siobhan', 'Cody', 'siobhan.cody@mysa.com', 'Intermediate Software Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000012', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Software Engineering Co-op Student - Emeka Nduka (reports to Steve O'Keefe)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000017', 'Emeka', 'Nduka', 'emeka.nduka@mysa.com', 'Software Engineering Co-op Student', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000012', 'co-op', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- DevOps Team Lead - Stephen Piercey (reports to VP Eng)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000018', 'Stephen', 'Piercey', 'stephen.piercey@mysa.com', 'Senior Software Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Cloud Team Lead - Esteban Ricalde-Gonzalez (reports to VP Eng)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000019', 'Esteban', 'Ricalde-Gonzalez', 'esteban.ricalde@mysa.com', 'Software Development Team Lead', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Software Developer - Matthew Kennedy (reports to Esteban)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000020', 'Matthew', 'Kennedy', 'matthew.kennedy@mysa.com', 'Senior Software Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000019', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Software Developer - Adam Scammell (reports to Esteban)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000021', 'Adam', 'Scammell', 'adam.scammell@mysa.com', 'Senior Software Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000019', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- QA Software Support Team Lead (reports to Esteban)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000022', 'Graham', 'Smith', 'graham.smith@mysa.com', 'Software Support Specialist', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000019', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Intermediate Web Developer - Adam Paul (reports to Esteban)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000023', 'Adam', 'Paul', 'adam.paul@mysa.com', 'Intermediate Web Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000019', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Intern Shopify Developer - Zachary Coffey (reports to Esteban)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000024', 'Zachary', 'Coffey', 'zachary.coffey@mysa.com', 'Intern - Shopify Developer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000019', 'intern', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Product Management - Sharon Jones (reports to VP Eng)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000025', 'Sharon', 'Jones', 'sharon.jones@mysa.com', 'Senior Product Manager', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Product Manager Utility Initiatives - Joey Kim (reports to Sharon Jones)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000026', 'Joey', 'Kim', 'joey.kim@mysa.com', 'Senior Product Manager - Utility Initiatives', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000025', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Head of Production & Mechanical Design - Shikan Yue (reports to VP Eng)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000027', 'Shikan', 'Yue', 'shikan.yue@mysa.com', 'Head of Production & Mechanical Design', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Electronics Engineer - Javier Ortiz (reports to Shikan Yue)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000028', 'Javier', 'Ortiz', 'javier.ortiz@mysa.com', 'Senior Electronics Engineer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000027', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Hardware Designer - Michael Mitchell (reports to Shikan Yue)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000029', 'Michael', 'Mitchell', 'michael.mitchell@mysa.com', 'Senior Hardware Designer', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000027', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Production Engineering Co-op Student - Olivia Verge (reports to Shikan Yue)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000030', 'Olivia', 'Verge', 'olivia.verge@mysa.com', 'Production Engineering Co-op Student', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000027', 'co-op', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Product Development Coordinator - Victoria Stokes (reports to Shikan Yue)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e1000000-0000-0000-0000-000000000031', 'Victoria', 'Stokes', 'victoria.stokes@mysa.com', 'Product Development Coordinator', 'd1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000027', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- COMMERCIAL TEAM (reports to CRO)
-- ==========================================

-- Senior Director of Sales - Brookes Shen (reports to CRO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000001', 'Brookes', 'Shen', 'brookes.shen@mysa.com', 'Senior Director of Sales - Mysa HQ', 'd1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Business Development Manager - David Murray (reports to Brookes Shen)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000002', 'David', 'Murray', 'david.murray@mysa.com', 'Senior Business Development Manager', 'd1000000-0000-0000-0000-000000000002', 'e2000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Business Development Manager (National) - Zuber Ahmed (reports to Brookes Shen)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000003', 'Zuber', 'Ahmed', 'zuber.ahmed@mysa.com', 'Business Development Manager (National)', 'd1000000-0000-0000-0000-000000000002', 'e2000000-0000-0000-0000-000000000001', 'full-time', 'Remote', false)
ON CONFLICT (id) DO NOTHING;

-- Creative Content Specialist - Cole Inkpen (reports to CRO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000004', 'Cole', 'Inkpen', 'cole.inkpen@mysa.com', 'Creative Content Specialist', 'd1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Junior Digital Media Designer - Leah Sexton (reports to Cole Inkpen)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000005', 'Leah', 'Sexton', 'leah.sexton@mysa.com', 'Junior Digital Media Designer', 'd1000000-0000-0000-0000-000000000002', 'e2000000-0000-0000-0000-000000000004', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Commercial Planning Lead - Megan Cooze (reports to CRO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000006', 'Megan', 'Cooze', 'megan.cooze@mysa.com', 'Commercial Planning Lead', 'd1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- ECommerce Lead - Frank Nie (reports to CRO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000007', 'Frank', 'Nie', 'frank.nie@mysa.com', 'ECommerce Lead', 'd1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Email Marketing Specialist - Ka-Wing Lo (reports to Frank Nie)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000008', 'Ka-Wing', 'Lo', 'kawing.lo@mysa.com', 'Email Marketing Specialist', 'd1000000-0000-0000-0000-000000000002', 'e2000000-0000-0000-0000-000000000007', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Retail Channel Manager - Nico Boehme (Parental Leave, reports to CRO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin, is_on_leave, leave_note)
VALUES ('e2000000-0000-0000-0000-000000000009', 'Nico', 'Boehme', 'nico.boehme@mysa.com', 'Retail Channel Manager', 'd1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false, true, 'Parental Leave')
ON CONFLICT (id) DO NOTHING;

-- Channel Sales Representative - Jennifer Collins (reports to Nico Boehme)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000010', 'Jennifer', 'Collins', 'jennifer.collins@mysa.com', 'Channel Sales Representative', 'd1000000-0000-0000-0000-000000000002', 'e2000000-0000-0000-0000-000000000009', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Director of Energy Policy & Business Development - Mark Smit (reports to CRO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000011', 'Mark', 'Smit', 'mark.smit@mysa.com', 'Director of Energy Policy & Business Development', 'd1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Utility Programs Coordinator - Elizabeth Somolu (reports to Mark Smit)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e2000000-0000-0000-0000-000000000012', 'Elizabeth', 'Somolu', 'elizabeth.somolu@mysa.com', 'Utility Programs Coordinator', 'd1000000-0000-0000-0000-000000000002', 'e2000000-0000-0000-0000-000000000011', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Utility Programs Coordinator (Maternity Leave) - Nicole Duffett (reports to Mark Smit)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin, is_on_leave, leave_note)
VALUES ('e2000000-0000-0000-0000-000000000013', 'Nicole', 'Duffett', 'nicole.duffett@mysa.com', 'Utility Programs Coordinator', 'd1000000-0000-0000-0000-000000000002', 'e2000000-0000-0000-0000-000000000011', 'full-time', 'HQ', false, true, 'Maternity Leave')
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- CUSTOMER EXPERIENCE (reports to COO)
-- ==========================================

-- Head of CX - Tanner Coombs (reports to COO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000001', 'Tanner', 'Coombs', 'tanner.coombs@mysa.com', 'Head of CX', 'd1000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- CX Lead (Bilingual) - Sarah Ozon (reports to Tanner)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000002', 'Sarah', 'Ozon', 'sarah.ozon@mysa.com', 'CX Lead (Bilingual)', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- CX Associate - Devon Hong (reports to Sarah Ozon)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000003', 'Devon', 'Hong', 'devon.hong@mysa.com', 'CX Associate', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- CX Associate - Precious Eboreime (reports to Sarah Ozon)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000004', 'Precious', 'Eboreime', 'precious.eboreime@mysa.com', 'CX Associate', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Bilingual CX Associate - Melissa Jeudy (reports to Sarah Ozon)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000005', 'Melissa', 'Jeudy', 'melissa.jeudy@mysa.com', 'Bilingual CX Associate', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Bilingual CX Associate - Lamine Rabei (reports to Sarah Ozon)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000006', 'Lamine', 'Rabei', 'lamine.rabei@mysa.com', 'Bilingual CX Associate', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Bilingual QA & Training CX Specialist (Maternity Leave) - Mira Chay (reports to Sarah Ozon)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin, is_on_leave, leave_note)
VALUES ('e3000000-0000-0000-0000-000000000007', 'Mira', 'Chay', 'mira.chay@mysa.com', 'Bilingual QA & Training CX Specialist', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false, true, 'Maternity Leave')
ON CONFLICT (id) DO NOTHING;

-- Commercial Support Lead HQ - Andrew Gichuka (reports to Tanner)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000008', 'Andrew', 'Gichuka', 'andrew.gichuka@mysa.com', 'Commercial Support Lead - HQ', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- CX Installation Specialist - Leigh Chalker (reports to Tanner)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000009', 'Leigh', 'Chalker', 'leigh.chalker@mysa.com', 'CX Installation Specialist', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- CX Installation Specialist - Joshua Bennett (reports to Tanner)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000010', 'Joshua', 'Bennett', 'joshua.bennett@mysa.com', 'CX Installation Specialist', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Bilingual CX Installation Specialist - Donald Gross (reports to Tanner)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000011', 'Donald', 'Gross', 'donald.gross@mysa.com', 'Bilingual CX Installation Specialist', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Customer Deployment & Success Manager - Uzo Okonkwo (reports to Tanner)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e3000000-0000-0000-0000-000000000012', 'Uzo', 'Okonkwo', 'uzo.okonkwo@mysa.com', 'Customer Deployment & Success Manager', 'd1000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- IT & SECURITY (reports to COO)
-- ==========================================

-- IT Lead - Freddie Rose (reports to COO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e4000000-0000-0000-0000-000000000001', 'Freddie', 'Rose', 'freddie.rose@mysa.com', 'IT Lead', 'd1000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- OPERATIONS (reports to COO)
-- ==========================================

-- Director of Supply Chain - Alejandro Castanon (reports to COO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e5000000-0000-0000-0000-000000000001', 'Alejandro', 'Castanon', 'alejandro.castanon@mysa.com', 'Director of Supply Chain', 'd1000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Fulfillment & Operations Lead - Jennifer Squires (reports to Alejandro)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e5000000-0000-0000-0000-000000000002', 'Jennifer', 'Squires', 'jennifer.squires@mysa.com', 'Fulfillment & Operations Lead', 'd1000000-0000-0000-0000-000000000004', 'e5000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Logistics Coordinator - Stephen Collins (reports to Alejandro)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e5000000-0000-0000-0000-000000000003', 'Stephen', 'Collins', 'stephen.collins@mysa.com', 'Logistics Coordinator', 'd1000000-0000-0000-0000-000000000004', 'e5000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- FINANCE (reports to CEO via VP Finance)
-- ==========================================

-- VP of Finance and Corporate Secretary - John Barrett (reports to CEO)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e6000000-0000-0000-0000-000000000001', 'John', 'Barrett', 'john.barrett@mysa.com', 'VP of Finance and Corporate Secretary', 'd1000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Financial Controller - Mark Carberry (reports to John Barrett)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e6000000-0000-0000-0000-000000000002', 'Mark', 'Carberry', 'mark.carberry@mysa.com', 'Financial Controller', 'd1000000-0000-0000-0000-000000000005', 'e6000000-0000-0000-0000-000000000001', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Senior Financial Analyst - Emily Pyne (reports to Mark Carberry)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e6000000-0000-0000-0000-000000000003', 'Emily', 'Pyne', 'emily.pyne@mysa.com', 'Senior Financial Analyst', 'd1000000-0000-0000-0000-000000000005', 'e6000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- Junior Accountant - Michael Hanlon (reports to Mark Carberry)
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e6000000-0000-0000-0000-000000000004', 'Michael', 'Hanlon', 'michael.hanlon@mysa.com', 'Junior Accountant', 'd1000000-0000-0000-0000-000000000005', 'e6000000-0000-0000-0000-000000000002', 'full-time', 'HQ', false)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- PEOPLE & CULTURE (reports to CEO via VP P&C)
-- ==========================================

-- VP of People & Culture - Mari Miskell (reports to CEO) -- ADMIN
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e7000000-0000-0000-0000-000000000001', 'Mari', 'Miskell', 'mari.miskell@mysa.com', 'VP of People & Culture', 'd1000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000001', 'full-time', 'HQ', true)
ON CONFLICT (id) DO NOTHING;

-- People & Culture Lead (Maternity Leave) - Melanie Kung (reports to Mari) -- ADMIN
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin, is_on_leave, leave_note)
VALUES ('e7000000-0000-0000-0000-000000000002', 'Melanie', 'Kung', 'melanie.kung@mysa.com', 'People & Culture Lead', 'd1000000-0000-0000-0000-000000000006', 'e7000000-0000-0000-0000-000000000001', 'full-time', 'HQ', true, true, 'Maternity Leave')
ON CONFLICT (id) DO NOTHING;

-- People and Culture Specialist - Ameerah Mallam-Hassam (reports to Mari) -- ADMIN
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e7000000-0000-0000-0000-000000000003', 'Ameerah', 'Mallam-Hassam', 'ameerah.mallamhassam@mysa.com', 'People and Culture Specialist', 'd1000000-0000-0000-0000-000000000006', 'e7000000-0000-0000-0000-000000000001', 'full-time', 'HQ', true)
ON CONFLICT (id) DO NOTHING;

-- People and Culture Intern - Zoya Zidi (reports to Ameerah) -- ADMIN
INSERT INTO employees (id, first_name, last_name, email, job_title, department_id, manager_id, employment_type, location, is_admin)
VALUES ('e7000000-0000-0000-0000-000000000004', 'Zoya', 'Zidi', 'zoya.zidi@mysa.com', 'People and Culture Intern', 'd1000000-0000-0000-0000-000000000006', 'e7000000-0000-0000-0000-000000000003', 'intern', 'HQ', true)
ON CONFLICT (id) DO NOTHING;
