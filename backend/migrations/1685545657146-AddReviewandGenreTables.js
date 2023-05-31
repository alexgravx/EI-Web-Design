import typeorm from 'typeorm';

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddReviewandGenreTables1685545657146 {
    name = 'AddReviewandGenreTables1685545657146';

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "genre_name" varchar NOT NULL,
                CONSTRAINT "UQ_35a95dd11ad0db6e9684ca50df0" UNIQUE ("genre_name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "review" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "author" varchar NOT NULL,
                "author_username" varchar NOT NULL,
                "author_rating" integer NOT NULL,
                "content" varchar NOT NULL,
                "media_title" varchar NOT NULL,
                "media_id" integer NOT NULL,
                CONSTRAINT "UQ_20df04b6eebef170b3fe6497e93" UNIQUE ("author")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "date" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "date")
            SELECT "id",
                "date"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"("id")
            SELECT "id"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "date" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "adult" boolean NOT NULL,
                "popularity" integer NOT NULL,
                "runtime" integer NOT NULL,
                "countries" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "vote_count" integer NOT NULL,
                "vote_average" integer NOT NULL,
                CONSTRAINT "UQ_2f60caeb658a8623a7f7e54b13d" UNIQUE ("original_title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "date")
            SELECT "id",
                "date"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nickname" varchar NOT NULL,
                "name" varchar NOT NULL,
                "birthday" varchar NOT NULL,
                "gender" integer NOT NULL,
                "bio" varchar NOT NULL,
                "popularity" varchar NOT NULL,
                CONSTRAINT "UQ_b3a161a3ab7af6f4c262299fba8" UNIQUE ("nickname")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"("id")
            SELECT "id"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
        await queryRunner.query(`
            INSERT INTO "user"("id")
            SELECT "id"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "date" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "date")
            SELECT "id",
                "date"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"("id")
            SELECT "id"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "date" varchar NOT NULL,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "date")
            SELECT "id",
                "date"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "review"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }
}
