-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT,
    "description" TEXT,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slideId" INTEGER,
    "order" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Slide_order_key" ON "Slide"("order");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "Slide"("id") ON DELETE SET NULL ON UPDATE CASCADE;
