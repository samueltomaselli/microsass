ALTER TABLE "appointment" ALTER COLUMN "type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment" DROP COLUMN IF EXISTS "time";