import { Test, TestingModule } from '@nestjs/testing';
import { ThreatIntelService } from './threat-intel.service';

describe('ThreatIntelService', () => {
  let service: ThreatIntelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreatIntelService],
    }).compile();

    service = module.get<ThreatIntelService>(ThreatIntelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
