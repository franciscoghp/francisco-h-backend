import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm"

export const ALLOWED_ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
};

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string
    
    @Column()
    username: string

    @Column({ nullable: true })
    avatar: string

    @Column({
        type: 'enum',
        enum: Object.values(ALLOWED_ROLES),
        default: ALLOWED_ROLES.USER
    })
    role: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
