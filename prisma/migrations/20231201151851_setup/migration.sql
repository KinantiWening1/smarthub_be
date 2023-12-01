-- CreateTable
CREATE TABLE "Query" (
    "idQuery" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Query_pkey" PRIMARY KEY ("idQuery")
);

-- CreateTable
CREATE TABLE "Member" (
    "idMember" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "domicile" TEXT NOT NULL,
    "telp" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("idMember")
);

-- CreateTable
CREATE TABLE "Room" (
    "idRoom" SERIAL NOT NULL,
    "roomName" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "roomSize" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "availability" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("idRoom")
);

-- CreateTable
CREATE TABLE "Booking" (
    "idBooking" SERIAL NOT NULL,
    "idMember" INTEGER NOT NULL,
    "idRoom" INTEGER NOT NULL,
    "bookerName" TEXT NOT NULL,
    "bookingMade" TIMESTAMP(3) NOT NULL,
    "reservedTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("idBooking")
);

-- CreateTable
CREATE TABLE "Payment" (
    "idPayment" SERIAL NOT NULL,
    "payerName" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "timeReceived" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("idPayment")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_idMember_fkey" FOREIGN KEY ("idMember") REFERENCES "Member"("idMember") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_idRoom_fkey" FOREIGN KEY ("idRoom") REFERENCES "Room"("idRoom") ON DELETE RESTRICT ON UPDATE CASCADE;
