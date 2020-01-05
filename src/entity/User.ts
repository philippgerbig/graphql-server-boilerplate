import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column("text", {unique: true})
    email: string;

    @Field()
    @Column({nullable: true})
    firstName: string;

    @Field()
    @Column({nullable: true})
    lastName: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Column()
    password: string;

    @Column({default: false})
    confirmed: boolean;

}
