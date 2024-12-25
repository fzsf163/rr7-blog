-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "recordDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "readTime" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "readCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "bio" TEXT,
    "authorPage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "recieveEmail" BOOLEAN NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commenters" (
    "id" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "commentsId" TEXT,

    CONSTRAINT "Commenters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "commenterId" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slider" (
    "id" TEXT NOT NULL,
    "contents" TEXT NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedBlogs" (
    "id" TEXT NOT NULL,
    "contents" TEXT NOT NULL,

    CONSTRAINT "FeaturedBlogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestedTopics" (
    "id" TEXT NOT NULL,
    "requestedTopic" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "requesterContact" TEXT NOT NULL,

    CONSTRAINT "RequestedTopics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Commenters_userName_key" ON "Commenters"("userName");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES "Commenters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
