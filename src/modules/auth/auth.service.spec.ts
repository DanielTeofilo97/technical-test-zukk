import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDTO } from './dto/auth-register.dto';

const jwtServiceMock = {
    sign: jest.fn(),
    verify: jest.fn(),
};

const prismaMock = {
    user: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
    },
};

const userServiceMock = {
    create: jest.fn(),
};

describe('AuthService', () => {
    let authService: AuthService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: JwtService, useValue: jwtServiceMock },
                { provide: PrismaService, useValue: prismaMock },
                { provide: UserService, useValue: userServiceMock },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createToken', () => {
        it('should create a token for the user', () => {
            const user = { id: '123', name: 'John Doe', email: 'john@example.com' };
            const token = 'jwt_token';
            jwtServiceMock.sign.mockReturnValue(token);

            const result = authService.createToken(user);

            expect(result).toEqual({ user: { ...user, token } });
            expect(jwtServiceMock.sign).toHaveBeenCalledWith(
                { id: user.id, name: user.name, email: user.email },
                { expiresIn: '7 days', subject: user.id, issuer: 'login', audience: 'users' },
            );
        });
    });

    describe('checkToken', () => {
        it('should verify and return token data', () => {
            const token = 'jwt_token';
            const decodedData = { id: '123', name: 'John Doe' };
            jwtServiceMock.verify.mockReturnValue(decodedData);

            const result = authService.checkToken(token);

            expect(result).toEqual(decodedData);
            expect(jwtServiceMock.verify).toHaveBeenCalledWith(token, { audience: 'users', issuer: 'login' });
        });

        it('should throw BadRequestException for invalid token', () => {
            const token = 'invalid_token';
            jwtServiceMock.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(() => authService.checkToken(token)).toThrow(BadRequestException);
            expect(jwtServiceMock.verify).toHaveBeenCalledWith(token, { audience: 'users', issuer: 'login' });
        });
    });

    describe('isValidToken', () => {
        it('should return true for valid token', () => {
            const token = 'valid_token';
            authService.checkToken = jest.fn().mockReturnValue({ id: '123' });

            expect(authService.isValidToken(token)).toBe(true);
        });

        it('should return false for invalid token', () => {
            const token = 'invalid_token';
            authService.checkToken = jest.fn().mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(authService.isValidToken(token)).toBe(false);
        });
    });

    describe('login', () => {
        it('should return a token for valid credentials', async () => {
            const cpf = '12345678900';
            const password = 'password';
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { id: '123', name: 'John Doe', password: hashedPassword, role: 'user' };
            const token = 'jwt_token';

            prismaMock.user.findFirst.mockResolvedValue(user);
            jwtServiceMock.sign.mockReturnValue(token);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

            const result = await authService.login(cpf, password);

            expect(result).toEqual({ user: { ...user, token } });
            expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
                where: { cpf },
                select: { id: true, name: true, password: true, role: true },
            });
        });
        ;

        it('should throw UnauthorizedException for invalid credentials', async () => {
            const cpf = '12345678900';
            const password = 'wrong_password';
            prismaMock.user.findFirst.mockResolvedValue({
                id: '123',
                name: 'John Doe',
                password: await bcrypt.hash('correct_password', 10),
            });
            bcrypt.compare = jest.fn().mockResolvedValue(false);

            await expect(authService.login(cpf, password)).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('register', () => {
        it('should register a new user and return a token', async () => {
            const data: AuthRegisterDTO = {
                cpf: '12345678900',
                name: 'John Doe',
                password: 'password',
                role: 0,
            };

            const user = { id: '123', name: 'John Doe', role: 0 };
            const token = 'jwt_token';

            prismaMock.user.findFirst.mockResolvedValue(null); 
            userServiceMock.create.mockResolvedValue(user);
            prismaMock.user.findUnique.mockResolvedValue(user);
            jwtServiceMock.sign.mockReturnValue(token);

            const result = await authService.register(data);

            expect(result).toEqual({ user: { ...user, token } });
            expect(prismaMock.user.findFirst).toHaveBeenCalledWith({ where: { cpf: data.cpf } });
            expect(userServiceMock.create).toHaveBeenCalledWith(data);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { id: user.id }, select: { id: true, name: true, role: true } });
            expect(jwtServiceMock.sign).toHaveBeenCalledWith(
                {
                    id: user.id,
                    name: user.name,
                    email: undefined, 
                },
                {
                    expiresIn: '7 days',
                    subject: user.id,
                    issuer: 'login',
                    audience: 'users',
                },
            );
        });

        it('should throw BadRequestException if CPF already exists', async () => {
            const data = { cpf: '12345678900', name: 'John Doe', password: 'password', role: 0 };
            prismaMock.user.findFirst.mockResolvedValue({ id: '123' });

            await expect(authService.register(data)).rejects.toThrow(BadRequestException);
        });
    });
});
