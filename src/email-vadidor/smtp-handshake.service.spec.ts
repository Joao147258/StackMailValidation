import { Test, TestingModule } from '@nestjs/testing';
import { SmtpHandshakeService } from './smtp-handshake.service';

describe('SmtpHandshakeService', () => {
  let service: SmtpHandshakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmtpHandshakeService],
    }).compile();

    service = module.get<SmtpHandshakeService>(SmtpHandshakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
