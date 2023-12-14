import { randomUUID } from 'crypto';
import { NotFoundException } from '../exceptions/NotFoundException';
import { PasswordEncoder } from './PasswordEncoder';
import { PrismaClient, User} from "@prisma/client";
import * as jwt from "jsonwebtoken"

interface StoreUser extends Omit<User, "id"|"createdAt"|"updatedAt" > {}
interface UpdateUser extends Partial<User> {}
interface PayloadJwt{
    iat:number;
    jti:string;
    sub: string;
    email: string;
    exp: number;
}

export class UserService {
    private readonly passwordEncoder: PasswordEncoder;
    private readonly prisma: PrismaClient;

    constructor() {
        this.passwordEncoder = new PasswordEncoder();
        this.prisma = new PrismaClient();
    }
    
    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }


    async createUser(data:StoreUser): Promise<User>{
        data.password = await this.passwordEncoder.encode(data.password);
        const dateArray = data.birthDate
        return this.prisma.user.create({ data });
    }

    async getUserById(id: string): Promise<User> {
        const user: User | null = await this.prisma.user.findFirst({
            where: {
                id,
            },
        });
        if(!user){
            throw new NotFoundException("Usuário não encontrado!!!")
        }

        return user;
    }

    async getUserByEmail(email:string): Promise<User> {
        const user: User | null = await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
        
        if(!user) {
            throw new NotFoundException("Usuário não encontrado")
        }
        return user;
    }

    async updateUser(id:string, data:UpdateUser): Promise<User> {
        const user: User = await this.prisma.user.update({
            where: {
                id,
            },
            data,
        });
        return user;
    }

    async deleteUser(id:string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }

    signToken(user:User): string {
        return jwt.sign({
            jti: randomUUID(),
            sub: user.id,
            iat: Math.floor(Date.now() / 1000) - 30,
            email: user.email,
        }, 
        process.env.JWT_SECRET as string,
        {
            expiresIn: `${process.env.JWT_EXPIRATION}h`,
        }
        );
    };

    verifyToken(token:string): PayloadJwt {
        return jwt.verify(token,process.env.JWT_SECRET as string) as PayloadJwt;
    }
}
