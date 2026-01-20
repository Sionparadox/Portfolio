/*
  Warnings:

  - You are about to drop the column `demo` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `thumbnail` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "demo",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "contributions" TEXT[],
ADD COLUMN     "insights" TEXT[],
ADD COLUMN     "link" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Feature";

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
