import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddMovieTable1685451104020 {
    name = 'AddMovieTable1685451104020'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "date" varchar NOT NULL,
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
