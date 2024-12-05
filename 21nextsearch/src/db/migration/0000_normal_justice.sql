CREATE TABLE IF NOT EXISTS "searchProducts" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"name" text NOT NULL,
	"imageId" text NOT NULL,
	"price" double precision NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
