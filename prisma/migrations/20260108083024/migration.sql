-- CreateTable
CREATE TABLE "Timeline" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descriptions" TEXT[],
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);
