-- CreateEnum
CREATE TYPE "ProjectDetailType" AS ENUM ('contribution', 'insight');

-- CreateTable
CREATE TABLE "ProjectDetail" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "ProjectDetailType" NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectDetail_pkey" PRIMARY KEY ("id")
);

-- Backfill previous contributions into ProjectDetail rows.
INSERT INTO "ProjectDetail" ("id", "projectId", "type", "title", "link", "description", "order", "createdAt", "updatedAt")
SELECT
    concat(p."id", '-contribution-', c.position::text),
    p."id",
    'contribution'::"ProjectDetailType",
    c.title,
    NULL,
    '',
    c.position::integer,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Project" p
CROSS JOIN LATERAL unnest(COALESCE(p."contributions", '{}'::text[])) WITH ORDINALITY AS c(title, position);

-- Backfill previous insights into ProjectDetail rows.
INSERT INTO "ProjectDetail" ("id", "projectId", "type", "title", "link", "description", "order", "createdAt", "updatedAt")
SELECT
    concat(p."id", '-insight-', i.position::text),
    p."id",
    'insight'::"ProjectDetailType",
    i.title,
    NULL,
    '',
    i.position::integer,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Project" p
CROSS JOIN LATERAL unnest(COALESCE(p."insights", '{}'::text[])) WITH ORDINALITY AS i(title, position);

-- AlterTable
ALTER TABLE "Project"
DROP COLUMN "contributions",
DROP COLUMN "insights";

-- CreateIndex
CREATE INDEX "ProjectDetail_projectId_type_order_idx" ON "ProjectDetail"("projectId", "type", "order");

-- AddForeignKey
ALTER TABLE "ProjectDetail" ADD CONSTRAINT "ProjectDetail_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
