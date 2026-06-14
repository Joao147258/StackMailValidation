import { Test, TestingModule } from '@nestjs/testing';
import { SyntaxCheckService } from './syntax-check.service';

describe('SyntaxCheckService', () => {
  let service: SyntaxCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyntaxCheckService],
    }).compile();

    service = module.get<SyntaxCheckService>(SyntaxCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
