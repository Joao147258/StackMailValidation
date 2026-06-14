import { Test, TestingModule } from '@nestjs/testing';
import { EmailValidatorOrchestratorService } from './email-validator-orchestrator.service';

describe('EmailValidatorOrchestratorService', () => {
  let service: EmailValidatorOrchestratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailValidatorOrchestratorService],
    }).compile();

    service = module.get<EmailValidatorOrchestratorService>(EmailValidatorOrchestratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
