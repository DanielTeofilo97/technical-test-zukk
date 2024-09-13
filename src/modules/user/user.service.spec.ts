import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
    let userService: UserService;

    const prismaMock = {
        user: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new user and hash the password', async () => {
            const createUserDTO = { name: 'John Doe', cpf: '12345678900', password: 'password', role: 0 };
            const hashedPassword = 'hashed_password';
            const createdUser = { id: '1', ...createUserDTO, password: hashedPassword };

            jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);
            prismaMock.user.create.mockResolvedValueOnce(createdUser);

            const result = await userService.create(createUserDTO);

            expect(prismaMock.user.create).toHaveBeenCalledWith({
                data: { ...createUserDTO, password: hashedPassword },
            });
            expect(result).toEqual(createdUser);
        });
    });

    describe('list', () => {
        it('should return a list of users', async () => {
            const users = [
                { id: '1', name: 'John Doe', cpf: '12345678900', role: 'user' },
                { id: '2', name: 'Jane Smith', cpf: '09876543211', role: 'admin' },
            ];

            prismaMock.user.findMany.mockResolvedValueOnce(users);

            const result = await userService.list();

            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                select: { id: true, name: true, cpf: true, role: true },
                orderBy: { role: 'asc' },
            });
            expect(result).toEqual(users);
        });
    });

    describe('listOne', () => {
        it('should return a single user by ID', async () => {
            const user = { id: '1', name: 'John Doe', cpf: '12345678900', role: 'user' };

            prismaMock.user.findUnique.mockResolvedValueOnce(user);
            prismaMock.user.count.mockResolvedValueOnce(1); 

            const result = await userService.listOne('1');

            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { id: '1' },
            });
            expect(result).toEqual(user);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            prismaMock.user.count.mockResolvedValueOnce(0); 

            await expect(userService.listOne('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update an existing user', async () => {
            const updateUserDTO = { name: 'John Doe',cpf:"12076536671", password: 'newpassword', role: 0 };
            const hashedPassword = 'hashed_new_password';
            const updatedUser = { id: '1' };

            prismaMock.user.count.mockResolvedValueOnce(1); 
            jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);
            prismaMock.user.update.mockResolvedValueOnce(updatedUser);

            const result = await userService.update('1', updateUserDTO);

            expect(prismaMock.user.update).toHaveBeenCalledWith({
                data: { ...updateUserDTO, password: hashedPassword },
                where: { id: '1' },
                select: { id: true },
            });
            expect(result).toEqual(updatedUser);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            prismaMock.user.count.mockResolvedValueOnce(0); 

            await expect(userService.update('1', { name: 'New Name', cpf:"12076536671",password: 'password', role: 0 })).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should delete an existing user', async () => {
            const deletedUser = { id: '1', name: 'John Doe' };

            prismaMock.user.count.mockResolvedValueOnce(1);
            prismaMock.user.delete.mockResolvedValueOnce(deletedUser);

            const result = await userService.delete('1');

            expect(prismaMock.user.delete).toHaveBeenCalledWith({
                where: { id: '1' },
            });
            expect(result).toEqual(deletedUser);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            prismaMock.user.count.mockResolvedValueOnce(0); 

            await expect(userService.delete('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('exists', () => {
        it('should return true if user exists', async () => {
            prismaMock.user.count.mockResolvedValueOnce(1);

            await expect(userService.exists('1')).resolves.not.toThrow();
        });

        it('should throw NotFoundException if user does not exist', async () => {
            prismaMock.user.count.mockResolvedValueOnce(0);

            await expect(userService.exists('1')).rejects.toThrow(NotFoundException);
        });
    });
});
