import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class UpdateMovies1685546028573 {
    name = 'UpdateMovies1685546028573'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "date" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "adult" boolean NOT NULL,
                "popularity" integer NOT NULL,
                "runtime" integer NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "vote_count" integer NOT NULL,
                "vote_average" integer NOT NULL,
                CONSTRAINT "UQ_2f60caeb658a8623a7f7e54b13d" UNIQUE ("original_title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "date",
                    "original_title",
                    "adult",
                    "popularity",
                    "runtime",
                    "overview",
                    "poster_path",
                    "vote_count",
                    "vote_average"
                )
            SELECT "id",
                "date",
                "original_title",
                "adult",
                "popularity",
                "runtime",
                "overview",
                "poster_path",
                "vote_count",
                "vote_average"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
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
            INSERT INTO "movie"(
                    "id",
                    "date",
                    "original_title",
                    "adult",
                    "popularity",
                    "runtime",
                    "overview",
                    "poster_path",
                    "vote_count",
                    "vote_average"
                )
            SELECT "id",
                "date",
                "original_title",
                "adult",
                "popularity",
                "runtime",
                "overview",
                "poster_path",
                "vote_count",
                "vote_average"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
