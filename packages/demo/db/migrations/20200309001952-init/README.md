# Migration `20200309001952-init`

This migration has been generated at 3/9/2020, 12:19:52 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."Post" (
    "author" INTEGER   ,
    "content" TEXT   ,
    "post_id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT '' ,
    "view_count" INTEGER NOT NULL DEFAULT 0 ,FOREIGN KEY ("author") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."Profile" (
    "bio" TEXT   ,
    "profile_id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "user" INTEGER NOT NULL  ,FOREIGN KEY ("user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."User" (
    "email" TEXT NOT NULL DEFAULT '' ,
    "name" TEXT   ,
    "user_id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT
) 

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200309001952-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,30 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:./dev.db"
+}
+
+model Post {
+  post_id    Int      @id @default(autoincrement())
+  content    String?
+  title      String
+  author     User?
+  view_count Int    @default(0)
+}
+
+model Profile {
+  profile_id Int     @id @default(autoincrement())
+  bio        String?
+  user       User
+}
+
+model User {
+  user_id  Int       @id @default(autoincrement())
+  email    String    @unique
+  name     String?
+  posts    Post[]
+  profiles Profile[]
+}
```


