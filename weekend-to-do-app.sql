CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"task_name" VARCHAR (250),
"task_priority" VARCHAR (10)
);

INSERT INTO "tasks"
	("task_name", "task_priority")
VALUES 
	('Mek it gud', 'Medium'),
	('Then mek it bettuh', 'Low');

ALTER TABLE "tasks"
ADD "task_complete" BOOLEAN DEFAULT 'false';
