/*
  Warnings:

  - You are about to drop the column `keywords` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subTitle` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorPage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readStatus` to the `RequestedTopics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `RequestedTopics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "keywords",
DROP COLUMN "subTitle",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "readCount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RequestedTopics" ADD COLUMN     "readStatus" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authorPage",
DROP COLUMN "bio",
ADD COLUMN     "authorblog" TEXT,
ADD COLUMN     "shortbio" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TrendingBlogs" (
    "id" TEXT NOT NULL,
    "contents" TEXT NOT NULL,

    CONSTRAINT "TrendingBlogs_pkey" PRIMARY KEY ("id")
);
