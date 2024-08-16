-- CreateTable
CREATE TABLE "notes" (
    "userId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "isUrgent" BOOLEAN NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("userId","noteId")
);
