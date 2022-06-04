/*
  Warnings:

  - You are about to alter the column `height` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `weight` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `weight` on the `Set` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birtdate" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "height" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("birtdate", "createdAt", "height", "id", "name", "updatedAt", "userId", "weight") SELECT "birtdate", "createdAt", "height", "id", "name", "updatedAt", "userId", "weight" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
CREATE TABLE "new_Set" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exersizeId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    CONSTRAINT "Set_exersizeId_fkey" FOREIGN KEY ("exersizeId") REFERENCES "Exersize" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Set" ("exersizeId", "id", "reps", "weight") SELECT "exersizeId", "id", "reps", "weight" FROM "Set";
DROP TABLE "Set";
ALTER TABLE "new_Set" RENAME TO "Set";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
