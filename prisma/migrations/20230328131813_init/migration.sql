-- CreateTable
CREATE TABLE "Users" (
    "UserId" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "CreatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" TEXT NOT NULL,
    "Status" INTEGER NOT NULL DEFAULT 1,
    "ModifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedBy" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "PhoneNumber" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Username_key" ON "Users"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");
