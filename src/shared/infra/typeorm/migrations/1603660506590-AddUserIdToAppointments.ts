import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1603660506590
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'appointments',
            await new TableForeignKey({
                name: 'AppointmentUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'appointments',
            'AppointmentsProvider',
        );
        await queryRunner.dropColumn('appointments', 'user_id');
    }
}
