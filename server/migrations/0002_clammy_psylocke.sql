CREATE TABLE IF NOT EXISTS "patient" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp (3),
	CONSTRAINT "patient_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "appointment" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment" ADD COLUMN "patient_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
