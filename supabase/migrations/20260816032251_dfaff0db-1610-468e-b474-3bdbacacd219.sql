INSERT INTO public.skills (id,name,category,difficulty,description) VALUES
('pull-up','Pull-up','Strength','Beginner','The foundation of every pulling skill. Build scapular control, full-range strength and a clean, honest rep.'),
('dip','Dip','Strength','Beginner','Vertical pressing power for the muscle-up and every straight-arm skill that follows.'),
('push-up','Push-up','Strength','Beginner','Horizontal pressing mastery with a braced line from heel to head.'),
('handstand','Handstand','Skills','Intermediate','Balance, alignment and shoulder capacity. The gateway skill for all overhead work.'),
('muscle-up','Muscle-up','Skills','Intermediate','Explosive pull, fast transition, controlled press-out. Power meets technique.'),
('hspu','HSPU','Skills','Advanced','Handstand push-up: vertical pressing strength under full bodyweight.'),
('front-lever','Front Lever','Advanced','Advanced','Straight-arm pulling and total-body tension held horizontal to the ground.'),
('planche','Planche','Advanced','Elite','The straight-arm pressing benchmark. Built on lean, protraction and patience.'),
('90-hspu','90° HSPU','Advanced','Elite','Press from a 90-degree bent-arm position back to handstand. Elite pressing.'),
('full-planche','Full Planche','Advanced','Elite','Full straight-body planche hold. The final entry in the pressing pathway.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.programs (skill_id,title,level,description)
SELECT s.id, s.name || ' Program', s.difficulty, 'A structured pathway to the ' || s.name || '.'
FROM public.skills s
WHERE NOT EXISTS (SELECT 1 FROM public.programs p WHERE p.skill_id = s.id);

INSERT INTO public.lessons (program_id,title,description,"order",is_free,duration)
SELECT p.id, v.title, 'Technique focus, prescribed volume and quality standards for this step.', v.ord, v.is_free, 540
FROM (VALUES
('pull-up',1,'Dead Hang & Scapular Control',true),('pull-up',2,'Active Hang Pulls',true),('pull-up',3,'Band-Assisted Pull-up',true),('pull-up',4,'Negative Pull-up',false),('pull-up',5,'Full Pull-up',false),('pull-up',6,'Weighted Pull-up',false),('dip',1,'Parallel Bar Support Hold',true),('dip',2,'Negative Dip',true),('dip',3,'Band-Assisted Dip',true),('dip',4,'Full Dip',false),('dip',5,'Weighted / Straight Bar Dip',false),('push-up',1,'Incline Push-up',true),('push-up',2,'Full Push-up',true),('push-up',3,'Tempo Push-up',true),('push-up',4,'Diamond & Archer Push-up',false),('push-up',5,'Pseudo Planche Push-up',false),('handstand',1,'Wrist Prep & Wall Plank',true),('handstand',2,'Chest-to-Wall Hold',true),('handstand',3,'Weight Shifts & Taps',true),('handstand',4,'Kick-up Practice',false),('handstand',5,'Freestanding 5s',false),('handstand',6,'Freestanding 30s',false),('handstand',7,'Line Refinement',false),('muscle-up',1,'High Pull-up to Sternum',true),('muscle-up',2,'Straight Bar Dip',true),('muscle-up',3,'Transition Drills',true),('muscle-up',4,'Jumping Muscle-up',false),('muscle-up',5,'Band-Assisted Muscle-up',false),('muscle-up',6,'Strict Muscle-up',false),('hspu',1,'Pike Push-up',true),('hspu',2,'Elevated Pike Push-up',true),('hspu',3,'Wall HSPU Negative',true),('hspu',4,'Wall HSPU',false),('hspu',5,'Deficit Wall HSPU',false),('hspu',6,'Freestanding HSPU',false),('front-lever',1,'Scapular Pull-ups',true),('front-lever',2,'Tuck Front Lever',true),('front-lever',3,'Advanced Tuck',true),('front-lever',4,'One-Leg Front Lever',false),('front-lever',5,'Straddle Front Lever',false),('front-lever',6,'Full Front Lever',false),('planche',1,'Planche Lean',true),('planche',2,'Tuck Planche',true),('planche',3,'Advanced Tuck Planche',true),('planche',4,'Straddle Planche Negative',false),('planche',5,'Straddle Planche',false),('planche',6,'Half Lay Planche',false),('planche',7,'Full Planche',false),('90-hspu',1,'Deep Wall HSPU',true),('90-hspu',2,'90° Hold on Blocks',true),('90-hspu',3,'Negative 90° Press',true),('90-hspu',4,'Band-Assisted 90° Press',false),('90-hspu',5,'90° HSPU on Parallettes',false),('90-hspu',6,'Freestanding 90° HSPU',false),('full-planche',1,'Straddle Planche 15s',true),('full-planche',2,'Half Lay Hold',true),('full-planche',3,'Full Planche Negative',true),('full-planche',4,'Full Planche 3s',false),('full-planche',5,'Full Planche 10s',false)
) AS v(skill_id,ord,title,is_free)
JOIN public.programs p ON p.skill_id = v.skill_id
WHERE NOT EXISTS (SELECT 1 FROM public.lessons l WHERE l.program_id = p.id AND l."order" = v.ord);

INSERT INTO public.achievements (name,description,requirement) VALUES
('First Rep','Completed your first lesson','a1'),
('7-Day Streak','Trained 7 days in a row','a2'),
('Push-up Master','Finished the push-up pathway','a3'),
('Hang Time','60s dead hang logged','a4'),
('Balanced','First 10s freestanding handstand','a5'),
('Transition','First strict muscle-up','a6'),
('Tension','Advanced tuck front lever 15s','a7'),
('30-Day Streak','One month of consistency','a8');