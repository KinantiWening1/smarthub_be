-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "bookingMade" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "birthday" SET DATA TYPE DATE;
