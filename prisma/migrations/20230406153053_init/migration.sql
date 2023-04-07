-- CreateTable
CREATE TABLE "Users" (
    "UserId" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "CreatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" TEXT NOT NULL,
    "Status" INTEGER NOT NULL DEFAULT 1,
    "ModifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedBy" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "PhoneNumber" TEXT,
    "Profile" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Categories" (
    "CategoryId" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "CreatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" TEXT NOT NULL,
    "ModifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedBy" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryId")
);

-- CreateTable
CREATE TABLE "Products" (
    "ProductId" SERIAL NOT NULL,
    "BrandId" INTEGER NOT NULL,
    "ProductName" TEXT NOT NULL,
    "Price" DECIMAL(65,30) NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "CreatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" TEXT NOT NULL,
    "ModifiedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedBy" TEXT NOT NULL,
    "CategoryId" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductId")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "ProductImageId" SERIAL NOT NULL,
    "ImagePath" TEXT NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "IsMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("ProductImageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Username_key" ON "Users"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_CategoryName_key" ON "Categories"("CategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Products_ProductName_key" ON "Products"("ProductName");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
