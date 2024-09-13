import { Test, TestingModule } from '@nestjs/testing';
import { MetricService } from './metric.service';
import { PrismaService } from '../../prisma/prisma.service';

const prismaMock = {
  producer: {
    count: jest.fn(),
    aggregate: jest.fn(),
  },
  $queryRaw: jest.fn(),
};

describe('MetricService', () => {
  let service: MetricService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MetricService>(MetricService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFarmMetrics', () => {
    it('should return farm metrics correctly', async () => {
      const totalFazendas = 10;
      const totalHectares = { _sum: { areaTotalHectares: 5000 } };
      const farmsByState = [
        { state_name: 'SP', state_count: 5 },
        { state_name: 'MG', state_count: 3 },
      ];
      const farmsByCulture = [
        { culture_name: 'Corn', farm_count: 6 },
        { culture_name: 'Wheat', farm_count: 4 },
      ];
      const areaAgricultavel = { _sum: { areaAgricultavelHectares: 3000 } };
      const areaVegetacao = { _sum: { areaVegetacaoHectares: 2000 } };


      prismaMock.producer.count.mockResolvedValue(totalFazendas);
      prismaMock.producer.aggregate
        .mockResolvedValueOnce(totalHectares)
        .mockResolvedValueOnce(areaAgricultavel)
        .mockResolvedValueOnce(areaVegetacao);
      prismaMock.$queryRaw
        .mockResolvedValueOnce(farmsByState)
        .mockResolvedValueOnce(farmsByCulture);

      const result = await service.getFarmMetrics();

      expect(result).toEqual({
        totalFazendas,
        totalHectares: totalHectares._sum.areaTotalHectares,
        usoSolo: {
          areaAgricultavel: areaAgricultavel._sum.areaAgricultavelHectares,
          areaVegetacao: areaVegetacao._sum.areaVegetacaoHectares,
        },
        farmsByState,
        farmsByCulture,
      });

      expect(prisma.producer.count).toHaveBeenCalledTimes(1);
      expect(prisma.producer.aggregate).toHaveBeenCalledTimes(3);
      expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);
    });
  });
});
