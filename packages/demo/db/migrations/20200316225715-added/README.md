# Migration `20200316225715-added`

This migration has been generated at 3/16/2020, 10:57:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "quaint"."User" ADD COLUMN "gender" TEXT  DEFAULT 'male' ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200309022155-change..20200316225715-added
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./dev.db"
 }
 model Post {
   post_id    String     @id @default(uuid())
@@ -24,7 +24,8 @@
 model User {
   user_id  String      @id @default(uuid())
   email    String    @unique
   name     String?
+  gender   String?      @default("male")
   posts    Post[]
   profiles Profile[]
-}
+}
```


