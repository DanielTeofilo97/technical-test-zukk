import { PrismaService } from '../../prisma/prisma.service';
import { ProducerService } from './producer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

const fakeProducers = [
  {
    id: '6faba3f4-0a98-4b51-85da-4017e7118bdd',
    cpfCnpj: "67608705000167",
    nomeProdutor: "João Braga da Silva",
    nomeFazenda: "Fazenda de Minas",
    cidade: "Brumadinho",
    estado: "MG",
    areaTotalHectares: 1003,
    areaAgricultavelHectares: 803,
    areaVegetacaoHectares: 200,
    idUserCreate: '4df4d18e-89f8-4920-91ed-de84753029aa',
    createdAt: new Date(),
    idUserUpdate: '4df4d18e-89f8-4920-91ed-de84753029aa',
    updatedAt: new Date(), 
    cultures: [
      {
        idCulture: "2ff544ab-b572-4f58-9f33-6192b8c25eaf",
        idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
      },
      {
        idCulture: "42aa2803-26cd-4daa-a34b-d5822b32beb3",
        idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
      }
    ]
  },
  {
    id: "b0e3b0e0-9b6d-4be0-a507-1c66d828f079",
    cpfCnpj: "91354415000",
    nomeProdutor: "João Doria da Silva",
    nomeFazenda: "Fazenda Diamante",
    cidade: "Brumadinho",
    estado: "MG",
    areaTotalHectares: 20000,
    areaAgricultavelHectares: 15000,
    areaVegetacaoHectares: 5000,
    idUserCreate: "52c31fd3-9178-4d6f-a2d6-fb3e6a627dff",
    createdAt: "2024-09-13T13:44:50.601Z",
    idUserUpdate: "52c31fd3-9178-4d6f-a2d6-fb3e6a627dff",
    updatedAt: "2024-09-13T13:44:50.601Z"
  },
  {
    nomeFazenda: "Fazenda das Gerais Teste",
    cultures: [
      {
        idCulture: "49233b3e-9f0f-4587-a3aa-611675a88f55"
      },
      {
        idCulture: "40b99900-9df3-4f02-a5eb-11e46d915973"
      }
    ]
  }
];

const fakeCultures = [
  {
    id: "168edaa1-ff01-4038-9918-182f21fe4b4b",
  },
  {
    id: "2bbffea0-99ac-4dac-928d-1d739ebb1d4f",
  },
]


const fakeProducerCulture = [
  {
    idCulture: "168edaa1-ff01-4038-9918-182f21fe4b4b",
  },
  {
    idCulture: "2bbffea0-99ac-4dac-928d-1d739ebb1d4f",
  },
]

const prismaMock = {
  producer: {
    delete: jest.fn(),
    create: jest.fn().mockReturnValue(fakeProducers[1]),
    update: jest.fn().mockResolvedValue(fakeProducers[0]),
    findUnique: jest.fn().mockResolvedValue(fakeProducers[0]),
    findFirst: jest.fn().mockResolvedValue(null),
    findMany: jest.fn().mockResolvedValue(fakeProducers),
    count: jest.fn().mockResolvedValue(fakeProducers.length),
  },
  culture: {
    findMany: jest.fn().mockResolvedValue(fakeCultures),
  },
  producerCulture: {
    createMany: jest.fn(),
    deleteMany: jest.fn(),
    findMany: jest.fn().mockResolvedValue(fakeProducerCulture),
  },
};

describe('ProducerService', () => {
  let service: ProducerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    prisma = module.get<PrismaService>(PrismaService);
  });


  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('create', () => {
    it(`should create a new producer`, async () => {
      const newProducer = {
        cpfCnpj: "41936672006",
        nomeProdutor: "João Doria da Silva",
        nomeFazenda: "Fazenda Diamante",
        cidade: "Brumadinho",
        estado: "MG",
        areaTotalHectares: 20000,
        areaAgricultavelHectares: 15000,
        areaVegetacaoHectares: 5000,
        cultures: [
          {
            idCulture: "2bbffea0-99ac-4dac-928d-1d739ebb1d4f",
            idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
          },
          {
            idCulture: "49233b3e-9f0f-4587-a3aa-611675a88f55",
            idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
          }
        ]
      }

      const response = await service.create(newProducer, '52c31fd3-9178-4d6f-a2d6-fb3e6a627dff');

      expect(response).toEqual(fakeProducers[1]);
      expect(prisma.producer.create).toHaveBeenCalledTimes(1);

    });
  });


  describe('list', () => {
    it(`should return an array of producers`, async () => {
      const response = await service.list({
        skip: 0,
        take: 10,
        filter: {},
        orderBy: { createdAt: 'desc' },
      });

      expect(response.producers).toEqual(fakeProducers);
      expect(prisma.producer.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.producer.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: {},
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          cpfCnpj: true,
          nomeProdutor: true,
          nomeFazenda: true,
          cidade: true,
          estado: true,
          areaTotalHectares: true,
          areaVegetacaoHectares: true,
          areaAgricultavelHectares: true,
          createdAt: true,
          updatedAt: true,
          cultures: {
            select: {
              culture: {
                select: {
                  id: true,
                  nome: true,
                },
              },
            },
          },
          createdBy: {
            select: {
              name: true,
            },
          },
          updatedBy: {
            select: {
              name: true,
            },
          },
        },
      });
    });
  });

  describe('update', () => {
    it(`should update a producer`, async () => {

      const updatedProducer = {
        id: '6faba3f4-0a98-4b51-85da-4017e7118bdd',
        cpfCnpj: '67608705000167',
        nomeProdutor: 'João Braga da Silva',
        nomeFazenda: 'Fazenda de Minas',
        cidade: 'Brumadinho',
        estado: 'MG',
        areaTotalHectares: 1003,
        areaAgricultavelHectares: 803,
        areaVegetacaoHectares: 200,
        idUserCreate: '4df4d18e-89f8-4920-91ed-de84753029aa',
        createdAt: new Date('2024-09-13T13:32:23.134Z'),
        idUserUpdate: '4df4d18e-89f8-4920-91ed-de84753029aa',
        updatedAt: new Date('2024-09-13T13:32:23.134Z'),
        cultures: [
          {
            idCulture: "2ff544ab-b572-4f58-9f33-6192b8c25eaf",
            idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
          },
          {
            idCulture: "42aa2803-26cd-4daa-a34b-d5822b32beb3",
            idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
          }
        ]
      };

      jest.spyOn(prisma.producer, 'update').mockResolvedValue(updatedProducer);

      const response = await service.update('6faba3f4-0a98-4b51-85da-4017e7118bdd', updatedProducer, '4df4d18e-89f8-4920-91ed-de84753029aa');

      expect(response).toEqual(updatedProducer);
      expect(prisma.producer.update).toHaveBeenCalledTimes(1);

      //const [received] = (prisma.producer.update as jest.Mock).mock.calls[0];
      //console.log('Received:', received);

    });




    it(`should return NotFoundException when no producer is found`, async () => {
      const unexistingPost = {
        nomeFazenda: "Fazenda das Gerais Teste",
        cultures: [
          {
            idCulture: "49233b3e-9f0f-4587-a3aa-611675a88f55",
            idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
          },
          {
            idCulture: "40b99900-9df3-4f02-a5eb-11e46d915973",
            idProducer: "6faba3f4-0a98-4b51-85da-4017e7118bdd"
          }
        ]
      }
      jest.spyOn(prisma.producer, 'update').mockRejectedValue(new Error('Specific validation error'));

      try {
        await service.update('6faba3f4-0a98-4b51-85da-4017e7118bdd', unexistingPost, '4df4d18e-89f8-4920-91ed-de84753029aa');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Specific validation error');
      }

      expect(prisma.producer.update).toHaveBeenCalledWith({
        where: { id: '6faba3f4-0a98-4b51-85da-4017e7118bdd' },
        data: {
          nomeFazenda: 'Fazenda das Gerais Teste',
          idUserUpdate: '4df4d18e-89f8-4920-91ed-de84753029aa'
        },
        select: {
          id: true,
        },
      });
    });
  });

  describe('delete', () => {
    it(`should delete producer and return empty body`, async () => {
      expect(await service.delete('28f6a923-62e2-403d-a22e-ed8e6286442e')).toBeUndefined();
      expect(prisma.producer.delete).toHaveBeenCalledTimes(1);
      expect(prisma.producer.delete).toHaveBeenCalledWith({ where: { id: '28f6a923-62e2-403d-a22e-ed8e6286442e' } });
    });

    it(`should return NotFoundException if producer does not exist`, async () => {
      jest.spyOn(prisma.producer, 'delete').mockRejectedValue(new Error());

      try {
        await service.delete('28f6a923-62e2-403d-a22e-ed8e6286442e');
      } catch (error) {
        expect(error).toEqual(new NotFoundException(error));
      }

      expect(prisma.producer.delete).toHaveBeenCalledTimes(1);
      expect(prisma.producer.delete).toHaveBeenCalledWith({
        where: { id: '28f6a923-62e2-403d-a22e-ed8e6286442e' },
      });
    });
  })
});
