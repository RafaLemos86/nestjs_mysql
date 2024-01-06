import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: Number

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column({
        default: Role.User,
        enum: Role
    })
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
