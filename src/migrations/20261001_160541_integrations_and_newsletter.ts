import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_content_mode" AS ENUM('layout', 'text');
  CREATE TYPE "public"."enum__pages_v_version_content_mode" AS ENUM('layout', 'text');
  CREATE TYPE "public"."enum_forms_redirect_type" AS ENUM('reference', 'custom');
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  ALTER TABLE "pages" ADD COLUMN "content_mode" "enum_pages_content_mode" DEFAULT 'layout';
  ALTER TABLE "pages" ADD COLUMN "body" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_content_mode" "enum__pages_v_version_content_mode" DEFAULT 'layout';
  ALTER TABLE "_pages_v" ADD COLUMN "version_body" jsonb;
  ALTER TABLE "forms" ADD COLUMN "redirect_type" "enum_forms_redirect_type" DEFAULT 'reference';
  ALTER TABLE "search_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "newsletter_subscribers_id" integer;
  ALTER TABLE "settings" ADD COLUMN "integrations_email_resend_api_key" varchar;
  ALTER TABLE "settings" ADD COLUMN "integrations_email_from_address" varchar;
  ALTER TABLE "settings" ADD COLUMN "integrations_email_from_name" varchar;
  ALTER TABLE "settings" ADD COLUMN "integrations_recaptcha_site_key" varchar;
  ALTER TABLE "settings" ADD COLUMN "integrations_recaptcha_secret_key" varchar;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "newsletter_subscribers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk";
  
  DROP INDEX "search_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx";
  ALTER TABLE "pages" DROP COLUMN "content_mode";
  ALTER TABLE "pages" DROP COLUMN "body";
  ALTER TABLE "_pages_v" DROP COLUMN "version_content_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_body";
  ALTER TABLE "forms" DROP COLUMN "redirect_type";
  ALTER TABLE "search_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "newsletter_subscribers_id";
  ALTER TABLE "settings" DROP COLUMN "integrations_email_resend_api_key";
  ALTER TABLE "settings" DROP COLUMN "integrations_email_from_address";
  ALTER TABLE "settings" DROP COLUMN "integrations_email_from_name";
  ALTER TABLE "settings" DROP COLUMN "integrations_recaptcha_site_key";
  ALTER TABLE "settings" DROP COLUMN "integrations_recaptcha_secret_key";
  DROP TYPE "public"."enum_pages_content_mode";
  DROP TYPE "public"."enum__pages_v_version_content_mode";
  DROP TYPE "public"."enum_forms_redirect_type";`)
}
