import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { User } from "./User";

export const STATUS = {
    DRAFTED: 'DRAFTED',
    DELETED: 'DELETED',
    PUBLISHED: 'PUBLISHED',
};

@Entity('post')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string
    
    @Column()
    location: string

    @Column()
    likes: User[]
    
    @Column()
    author: User

    @Column({ nullable: true })
    image: string

    @Column({
        type: 'enum',
        enum: Object.values(STATUS),
        default: STATUS.DRAFTED
    })
    status: string

}
