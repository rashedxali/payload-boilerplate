import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "our_work" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "our_work_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_our_work_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_our_work_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "guides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "our_work" CASCADE;
  DROP TABLE "our_work_rels" CASCADE;
  DROP TABLE "_our_work_v" CASCADE;
  DROP TABLE "_our_work_v_rels" CASCADE;
  DROP TABLE "guides" CASCADE;
  DROP TABLE "_guides_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_our_work_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_guides_fk";
  
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_our_work_id_idx";
  DROP INDEX "payload_locked_documents_rels_guides_id_idx";
  ALTER TABLE "settings" ALTER COLUMN "seo_default_title_suffix" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "our_work_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "guides_id";
  DROP TYPE "public"."enum_services_meta_robots";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_meta_robots";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_our_work_meta_robots";
  DROP TYPE "public"."enum_our_work_status";
  DROP TYPE "public"."enum__our_work_v_version_meta_robots";
  DROP TYPE "public"."enum__our_work_v_version_status";
  DROP TYPE "public"."enum_guides_status";
  DROP TYPE "public"."enum__guides_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_our_work_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_our_work_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__our_work_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__our_work_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"layout" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_canonical_u_r_l" varchar,
  	"meta_robots" "enum_services_meta_robots" DEFAULT 'index',
  	"meta_json_ld" varchar,
  	"meta_social_open_graph_title" varchar,
  	"meta_social_open_graph_description" varchar,
  	"meta_social_open_graph_image_id" integer,
  	"meta_social_twitter_title" varchar,
  	"meta_social_twitter_description" varchar,
  	"meta_social_twitter_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_layout" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_canonical_u_r_l" varchar,
  	"version_meta_robots" "enum__services_v_version_meta_robots" DEFAULT 'index',
  	"version_meta_json_ld" varchar,
  	"version_meta_social_open_graph_title" varchar,
  	"version_meta_social_open_graph_description" varchar,
  	"version_meta_social_open_graph_image_id" integer,
  	"version_meta_social_twitter_title" varchar,
  	"version_meta_social_twitter_description" varchar,
  	"version_meta_social_twitter_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "our_work" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"layout" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_canonical_u_r_l" varchar,
  	"meta_robots" "enum_our_work_meta_robots" DEFAULT 'index',
  	"meta_json_ld" varchar,
  	"meta_social_open_graph_title" varchar,
  	"meta_social_open_graph_description" varchar,
  	"meta_social_open_graph_image_id" integer,
  	"meta_social_twitter_title" varchar,
  	"meta_social_twitter_description" varchar,
  	"meta_social_twitter_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_our_work_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "our_work_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_our_work_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_layout" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_canonical_u_r_l" varchar,
  	"version_meta_robots" "enum__our_work_v_version_meta_robots" DEFAULT 'index',
  	"version_meta_json_ld" varchar,
  	"version_meta_social_open_graph_title" varchar,
  	"version_meta_social_open_graph_description" varchar,
  	"version_meta_social_open_graph_image_id" integer,
  	"version_meta_social_twitter_title" varchar,
  	"version_meta_social_twitter_description" varchar,
  	"version_meta_social_twitter_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__our_work_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_our_work_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"file_id" integer,
  	"thumbnail_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_guides_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_guides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_file_id" integer,
  	"version_thumbnail_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__guides_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "settings" ALTER COLUMN "seo_default_title_suffix" SET DEFAULT '| Notionhive';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "our_work_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "guides_id" integer;
  ALTER TABLE "services" ADD CONSTRAINT "services_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_social_open_graph_image_id_media_id_fk" FOREIGN KEY ("meta_social_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_social_twitter_image_id_media_id_fk" FOREIGN KEY ("meta_social_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_social_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_meta_social_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_social_twitter_image_id_media_id_fk" FOREIGN KEY ("version_meta_social_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_work" ADD CONSTRAINT "our_work_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_work" ADD CONSTRAINT "our_work_meta_social_open_graph_image_id_media_id_fk" FOREIGN KEY ("meta_social_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_work" ADD CONSTRAINT "our_work_meta_social_twitter_image_id_media_id_fk" FOREIGN KEY ("meta_social_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_work_rels" ADD CONSTRAINT "our_work_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."our_work"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_work_rels" ADD CONSTRAINT "our_work_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_our_work_v" ADD CONSTRAINT "_our_work_v_parent_id_our_work_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."our_work"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_our_work_v" ADD CONSTRAINT "_our_work_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_our_work_v" ADD CONSTRAINT "_our_work_v_version_meta_social_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_meta_social_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_our_work_v" ADD CONSTRAINT "_our_work_v_version_meta_social_twitter_image_id_media_id_fk" FOREIGN KEY ("version_meta_social_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_our_work_v_rels" ADD CONSTRAINT "_our_work_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_our_work_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_our_work_v_rels" ADD CONSTRAINT "_our_work_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_parent_id_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_featured_image_idx" ON "services" USING btree ("featured_image_id");
  CREATE INDEX "services_meta_social_open_graph_meta_social_open_graph_i_idx" ON "services" USING btree ("meta_social_open_graph_image_id");
  CREATE INDEX "services_meta_social_twitter_meta_social_twitter_image_idx" ON "services" USING btree ("meta_social_twitter_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_categories_id_idx" ON "services_rels" USING btree ("categories_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_featured_image_idx" ON "_services_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_services_v_version_meta_social_open_graph_version_meta__idx" ON "_services_v" USING btree ("version_meta_social_open_graph_image_id");
  CREATE INDEX "_services_v_version_meta_social_twitter_version_meta_soc_idx" ON "_services_v" USING btree ("version_meta_social_twitter_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_categories_id_idx" ON "_services_v_rels" USING btree ("categories_id");
  CREATE INDEX "our_work_featured_image_idx" ON "our_work" USING btree ("featured_image_id");
  CREATE INDEX "our_work_meta_social_open_graph_meta_social_open_graph_i_idx" ON "our_work" USING btree ("meta_social_open_graph_image_id");
  CREATE INDEX "our_work_meta_social_twitter_meta_social_twitter_image_idx" ON "our_work" USING btree ("meta_social_twitter_image_id");
  CREATE UNIQUE INDEX "our_work_slug_idx" ON "our_work" USING btree ("slug");
  CREATE INDEX "our_work_updated_at_idx" ON "our_work" USING btree ("updated_at");
  CREATE INDEX "our_work_created_at_idx" ON "our_work" USING btree ("created_at");
  CREATE INDEX "our_work__status_idx" ON "our_work" USING btree ("_status");
  CREATE INDEX "our_work_rels_order_idx" ON "our_work_rels" USING btree ("order");
  CREATE INDEX "our_work_rels_parent_idx" ON "our_work_rels" USING btree ("parent_id");
  CREATE INDEX "our_work_rels_path_idx" ON "our_work_rels" USING btree ("path");
  CREATE INDEX "our_work_rels_categories_id_idx" ON "our_work_rels" USING btree ("categories_id");
  CREATE INDEX "_our_work_v_parent_idx" ON "_our_work_v" USING btree ("parent_id");
  CREATE INDEX "_our_work_v_version_version_featured_image_idx" ON "_our_work_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_our_work_v_version_meta_social_open_graph_version_meta__idx" ON "_our_work_v" USING btree ("version_meta_social_open_graph_image_id");
  CREATE INDEX "_our_work_v_version_meta_social_twitter_version_meta_soc_idx" ON "_our_work_v" USING btree ("version_meta_social_twitter_image_id");
  CREATE INDEX "_our_work_v_version_version_slug_idx" ON "_our_work_v" USING btree ("version_slug");
  CREATE INDEX "_our_work_v_version_version_updated_at_idx" ON "_our_work_v" USING btree ("version_updated_at");
  CREATE INDEX "_our_work_v_version_version_created_at_idx" ON "_our_work_v" USING btree ("version_created_at");
  CREATE INDEX "_our_work_v_version_version__status_idx" ON "_our_work_v" USING btree ("version__status");
  CREATE INDEX "_our_work_v_created_at_idx" ON "_our_work_v" USING btree ("created_at");
  CREATE INDEX "_our_work_v_updated_at_idx" ON "_our_work_v" USING btree ("updated_at");
  CREATE INDEX "_our_work_v_latest_idx" ON "_our_work_v" USING btree ("latest");
  CREATE INDEX "_our_work_v_autosave_idx" ON "_our_work_v" USING btree ("autosave");
  CREATE INDEX "_our_work_v_rels_order_idx" ON "_our_work_v_rels" USING btree ("order");
  CREATE INDEX "_our_work_v_rels_parent_idx" ON "_our_work_v_rels" USING btree ("parent_id");
  CREATE INDEX "_our_work_v_rels_path_idx" ON "_our_work_v_rels" USING btree ("path");
  CREATE INDEX "_our_work_v_rels_categories_id_idx" ON "_our_work_v_rels" USING btree ("categories_id");
  CREATE INDEX "guides_file_idx" ON "guides" USING btree ("file_id");
  CREATE INDEX "guides_thumbnail_idx" ON "guides" USING btree ("thumbnail_id");
  CREATE UNIQUE INDEX "guides_slug_idx" ON "guides" USING btree ("slug");
  CREATE INDEX "guides_updated_at_idx" ON "guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "guides" USING btree ("created_at");
  CREATE INDEX "guides__status_idx" ON "guides" USING btree ("_status");
  CREATE INDEX "_guides_v_parent_idx" ON "_guides_v" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_version_file_idx" ON "_guides_v" USING btree ("version_file_id");
  CREATE INDEX "_guides_v_version_version_thumbnail_idx" ON "_guides_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_guides_v_version_version_slug_idx" ON "_guides_v" USING btree ("version_slug");
  CREATE INDEX "_guides_v_version_version_updated_at_idx" ON "_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_guides_v_version_version_created_at_idx" ON "_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_guides_v_version_version__status_idx" ON "_guides_v" USING btree ("version__status");
  CREATE INDEX "_guides_v_created_at_idx" ON "_guides_v" USING btree ("created_at");
  CREATE INDEX "_guides_v_updated_at_idx" ON "_guides_v" USING btree ("updated_at");
  CREATE INDEX "_guides_v_latest_idx" ON "_guides_v" USING btree ("latest");
  CREATE INDEX "_guides_v_autosave_idx" ON "_guides_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_our_work_fk" FOREIGN KEY ("our_work_id") REFERENCES "public"."our_work"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_our_work_id_idx" ON "payload_locked_documents_rels" USING btree ("our_work_id");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("guides_id");`)
}
