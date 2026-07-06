-- CreateTable
CREATE TABLE "statement_summaries" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "totalAmountCents" INTEGER NOT NULL DEFAULT 0,
    "purchaseCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "statement_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "statement_summaries_customerId_year_month_key" ON "statement_summaries"("customerId", "year", "month");
