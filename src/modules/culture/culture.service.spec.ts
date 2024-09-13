import { PrismaService } from '../../prisma/prisma.service';
import { CultureService } from './culture.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

const fakeCultures = [
  {
    id: "168edaa1-ff01-4038-9918-182f21fe4b4b",
    nome: "Banana",
    active: true,
    createdBy: {
      name: "User1",
    },
  },
  {
    id: "2bbffea0-99ac-4dac-928d-1d739ebb1d4f",
    nome: "Apple",
    active: true,
    createdBy: {
      name: "User2",
    },
  },
];


const fakeCulture = {
  id: "generated-id",
  nome: "Banana",
  active: true,
  createdAt: new Date(),
  idUserCreate: 'user-id',
};

const prismaMock = {
  culture: {
    delete: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn().mockResolvedValue({ nome: "Banana" }),
    findFirst: jest.fn(),
  },
};

describe('CultureService', () => {
  let service: CultureService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultureService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CultureService>(CultureService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return a list of cultures with pagination and filter', async () => {
      const filter = { nome: 'Banana' };
      const skip = 0;
      const take = 10;
      const orderBy = { createdAt: 'desc' };
      const totalCount = fakeCultures.length;

      prismaMock.culture.findMany.mockResolvedValue(fakeCultures);
      prismaMock.culture.count.mockResolvedValue(totalCount);

      const result = await service.list({ skip, take, filter, orderBy });

      expect(result).toEqual({
        totalCount,
        hasNextPage: false,
        vehicles: fakeCultures,
      });
      expect(prisma.culture.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.culture.findMany).toHaveBeenCalledWith({
        skip,
        take,
        where: {
          nome: { contains: filter.nome, mode: 'insensitive' },
          active: { equals: true },
        },
        orderBy,
        select: {
          id: true,
          nome: true,
          active: true,
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      });
      expect(prisma.culture.count).toHaveBeenCalledTimes(1);
      expect(prisma.culture.count).toHaveBeenCalledWith({
        where: {
          nome: { contains: filter.nome, mode: 'insensitive' },
          active: { equals: true },
        },
      });
    });

    it('should handle cases with no cultures', async () => {
      const filter = { nome: '' };
      const skip = 0;
      const take = 10;
      const orderBy = { createdAt: 'desc' };
      const totalCount = 0;

      prismaMock.culture.findMany.mockResolvedValue([]);
      prismaMock.culture.count.mockResolvedValue(totalCount);

      const result = await service.list({ skip, take, filter, orderBy });

      expect(result).toEqual({
        totalCount,
        hasNextPage: false,
        vehicles: [],
      });
      expect(prisma.culture.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.culture.count).toHaveBeenCalledTimes(1);
    });

    it('should handle pagination correctly', async () => {
      const filter = {};
      const skip = 0;
      const take = 1; // Simulando uma página com apenas um item
      const orderBy = { createdAt: 'desc' };
      const totalCount = fakeCultures.length;

      prismaMock.culture.findMany.mockResolvedValue([fakeCultures[0]]);
      prismaMock.culture.count.mockResolvedValue(totalCount);

      const result = await service.list({ skip, take, filter, orderBy });

      expect(result).toEqual({
        totalCount,
        hasNextPage: true,
        vehicles: [fakeCultures[0]],
      });
      expect(prisma.culture.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.culture.count).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new culture if it does not exist', async () => {
      const createCultureDTO = { nome: 'Banana', idUserCreate: 'user-id' };
      prismaMock.culture.findFirst.mockResolvedValue(null); 
      prismaMock.culture.create.mockResolvedValue(fakeCulture); 

      const result = await service.create(createCultureDTO, 'user-id');

      expect(result).toEqual(fakeCulture);
      expect(prisma.culture.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.culture.findFirst).toHaveBeenCalledWith({
        where: {
          nome: createCultureDTO.nome,
          active: true,
        },
      });
      expect(prisma.culture.create).toHaveBeenCalledTimes(1);
      expect(prisma.culture.create).toHaveBeenCalledWith({
        data: { ...createCultureDTO, idUserCreate: 'user-id' },
      });
    });

    it('should throw ConflictException if culture already exists', async () => {
      const createCultureDTO = { nome: 'Banana', idUserCreate: 'user-id' };
      prismaMock.culture.findFirst.mockResolvedValue(fakeCulture); 

      await expect(service.create(createCultureDTO, 'user-id')).rejects.toThrow(
        new ConflictException('Culture with nome already exists')
      );

      expect(prisma.culture.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.culture.findFirst).toHaveBeenCalledWith({
        where: {
          nome: createCultureDTO.nome,
          active: true,
        },
      });
      expect(prisma.culture.create).not.toHaveBeenCalled(); 
    });

    it('should throw BadRequestException on error', async () => {
      const createCultureDTO = { nome: 'Banana', idUserCreate: 'user-id' };
      prismaMock.culture.findFirst.mockResolvedValue(null); 
      prismaMock.culture.create.mockRejectedValue(new Error('Database error')); 

      await expect(service.create(createCultureDTO, 'user-id')).rejects.toThrow(
        new BadRequestException('Database error')
      );

      expect(prisma.culture.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.culture.findFirst).toHaveBeenCalledWith({
        where: {
          nome: createCultureDTO.nome,
          active: true,
        },
      });
      expect(prisma.culture.create).toHaveBeenCalledTimes(1);
      expect(prisma.culture.create).toHaveBeenCalledWith({
        data: { ...createCultureDTO, idUserCreate: 'user-id' },
      });
    });
  });

  describe('delete', () => {
    it('should deactivate a culture if it exists', async () => {
      prismaMock.culture.update.mockResolvedValueOnce({});

      await expect(service.delete('28f6a923-62e2-403d-a22e-ed8e6286442e')).resolves.toBeUndefined();

      expect(prisma.culture.update).toHaveBeenCalledTimes(1);
      expect(prisma.culture.update).toHaveBeenCalledWith({
        where: { id: '28f6a923-62e2-403d-a22e-ed8e6286442e' },
        data: { active: false },
      });
    });

    it('should throw NotFoundException if culture does not exist', async () => {
      prismaMock.culture.update.mockRejectedValueOnce(new Error('Culture not found')); 

      await expect(service.delete('28f6a923-62e2-403d-a22e-ed8e6286442e')).rejects.toThrow(NotFoundException);

      expect(prisma.culture.update).toHaveBeenCalledTimes(1);
      expect(prisma.culture.update).toHaveBeenCalledWith({
        where: { id: '28f6a923-62e2-403d-a22e-ed8e6286442e' },
        data: { active: false },
      });
    });
  });
});
