-- Fix spelling/name discrepancies based on audit against correct employee list

-- 1. Abir -> Aabir Basu
UPDATE employees SET first_name = 'Aabir', email = 'aabir.basu@getmysa.com' WHERE first_name = 'Abir' AND last_name = 'Basu';

-- 2. Andrew Gichuka -> Andrew Gaichuk
UPDATE employees SET last_name = 'Gaichuk', email = 'andrew.gaichuk@getmysa.com' WHERE first_name = 'Andrew' AND last_name = 'Gichuka';

-- 3. Brookes Shen -> Brookes Shean
UPDATE employees SET last_name = 'Shean', email = 'brookes.shean@getmysa.com' WHERE first_name = 'Brookes' AND last_name = 'Shen';

-- 4. Daniel Danielski -> Guilherme (Daniel) Correa Danielski
UPDATE employees SET first_name = 'Guilherme (Daniel)', last_name = 'Correa Danielski', email = 'daniel.correadanielski@getmysa.com' WHERE first_name = 'Daniel' AND last_name = 'Danielski';

-- 5. Emily Pyne -> Emily Payne
UPDATE employees SET last_name = 'Payne', email = 'emily.payne@getmysa.com' WHERE first_name = 'Emily' AND last_name = 'Pyne';

-- 6. Emeka Nduka -> Chukwuemeka (Emeka) Nduka-Nwagbo
UPDATE employees SET first_name = 'Chukwuemeka (Emeka)', last_name = 'Nduka-Nwagbo', email = 'emeka.nduka-nwagbo@getmysa.com' WHERE first_name = 'Emeka' AND last_name = 'Nduka';

-- 7. Frank Nie -> Shibo (Frank) Nie
UPDATE employees SET first_name = 'Shibo (Frank)', email = 'frank.nie@getmysa.com' WHERE first_name = 'Frank' AND last_name = 'Nie';

-- 8. Harkirt Kaur -> Harkirat (Keerat) Kaur
UPDATE employees SET first_name = 'Harkirat (Keerat)', email = 'harkirat.kaur@getmysa.com' WHERE first_name = 'Harkirt' AND last_name = 'Kaur';

-- 9. Ian Robertson -> Iain Robertson
UPDATE employees SET first_name = 'Iain', email = 'iain.robertson@getmysa.com' WHERE first_name = 'Ian' AND last_name = 'Robertson';

-- 10. Javier Ortiz -> Javier Ortiz Castro
UPDATE employees SET last_name = 'Ortiz Castro', email = 'javier.ortizcastro@getmysa.com' WHERE first_name = 'Javier' AND last_name = 'Ortiz';

-- 11. Joey Kim -> Youngeun (Joey) Kim
UPDATE employees SET first_name = 'Youngeun (Joey)', email = 'joey.kim@getmysa.com' WHERE first_name = 'Joey' AND last_name = 'Kim';

-- 12. Ka-Wing Lo -> Kar-Wing Lo
UPDATE employees SET first_name = 'Kar-Wing', email = 'karwing.lo@getmysa.com' WHERE first_name = 'Ka-Wing' AND last_name = 'Lo';

-- 13. Lamine Rabei -> Lamine (Mohamed) Rabei
UPDATE employees SET first_name = 'Lamine (Mohamed)' WHERE first_name = 'Lamine' AND last_name = 'Rabei';

-- 14. Mari Miskell -> Maria Miskell
UPDATE employees SET first_name = 'Maria', email = 'maria.miskell@getmysa.com' WHERE first_name = 'Mari' AND last_name = 'Miskell';

-- 15. Mark Simms -> Douglas (Mark) Simms
UPDATE employees SET first_name = 'Douglas (Mark)', email = 'mark.simms@getmysa.com' WHERE first_name = 'Mark' AND last_name = 'Simms';

-- 16. Mira Chay -> Mira Chaya
UPDATE employees SET last_name = 'Chaya', email = 'mira.chaya@getmysa.com' WHERE first_name = 'Mira' AND last_name = 'Chay';

-- 17. Rahul Nandkumar -> Rahul Nandakumar
UPDATE employees SET last_name = 'Nandakumar', email = 'rahul.nandakumar@getmysa.com' WHERE first_name = 'Rahul' AND last_name = 'Nandkumar';

-- 18. Sadf Mozaffari -> Sadaf Mozaffari
UPDATE employees SET first_name = 'Sadaf', email = 'sadaf.mozaffari@getmysa.com' WHERE first_name = 'Sadf' AND last_name = 'Mozaffari';

-- 19. Sharon Jones -> Sharon Janes
UPDATE employees SET last_name = 'Janes', email = 'sharon.janes@getmysa.com' WHERE first_name = 'Sharon' AND last_name = 'Jones';

-- 20. Shikan Yue -> Shikan (Kan) Yue
UPDATE employees SET first_name = 'Shikan (Kan)' WHERE first_name = 'Shikan' AND last_name = 'Yue';

-- 21. Siobhan Cody -> Siobhan Coady
UPDATE employees SET last_name = 'Coady', email = 'siobhan.coady@getmysa.com' WHERE first_name = 'Siobhan' AND last_name = 'Cody';

-- 22. Zoya Zidi -> Zoya Zaidi
UPDATE employees SET last_name = 'Zaidi', email = 'zoya.zaidi@getmysa.com' WHERE first_name = 'Zoya' AND last_name = 'Zidi';
