# Migration `20200309022155-change`

This migration has been generated at 3/9/2020, 2:21:55 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."Post" (
    "author" TEXT   ,
    "content" TEXT   ,
    "post_id" TEXT NOT NULL  ,
    "title" TEXT NOT NULL DEFAULT '' ,
    "view_count" INTEGER NOT NULL DEFAULT 0 ,
    PRIMARY KEY ("post_id"),FOREIGN KEY ("author") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."Profile" (
    "bio" TEXT   ,
    "profile_id" TEXT NOT NULL  ,
    "user" TEXT NOT NULL  ,
    PRIMARY KEY ("profile_id"),FOREIGN KEY ("user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."User" (
    "email" TEXT NOT NULL DEFAULT '' ,
    "name" TEXT   ,
    "user_id" TEXT NOT NULL  ,
    PRIMARY KEY ("user_id")
) 

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200309001952-init..20200309022155-change
--- datamodel.dml
+++ datamodel.dml
@@ -3,27 +3,27 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./dev.db"
 }
 model Post {
-  post_id    Int      @id @default(autoincrement())
+  post_id    String     @id @default(uuid())
   content    String?
   title      String
   author     User?
   view_count Int    @default(0)
 }
 model Profile {
-  profile_id Int     @id @default(autoincrement())
+  profile_id String     @id @default(uuid())
   bio        String?
   user       User
 }
 model User {
-  user_id  Int       @id @default(autoincrement())
+  user_id  String      @id @default(uuid())
   email    String    @unique
   name     String?
   posts    Post[]
   profiles Profile[]
```


