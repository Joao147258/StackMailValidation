import { Module } from '@nestjs/common';
import { EmailValidatorOrchestratorService } from './email-validator-orchestrator.service';
import { SyntaxCheckService } from './syntax-check.service';
import { DnsLookupService } from './dns-lookup.service';
import { SmtpHandshakeService } from './smtp-handshake.service';
import { EmailValidatorController } from './email-validator.controller';
import { ThreatIntelService } from './threat-intel.service';

@Module({
  providers: [EmailValidatorOrchestratorService, SyntaxCheckService, DnsLookupService, SmtpHandshakeService, ThreatIntelService],
  controllers: [EmailValidatorController]
})
export class EmailVadidorModule {}
