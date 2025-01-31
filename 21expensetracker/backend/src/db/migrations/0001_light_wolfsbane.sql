CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`amount` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `expenses` (`user_id`);--> statement-breakpoint
DROP TABLE `tasks`;