/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Slide` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Slide_order_key" ON "Slide"("order");
