import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { DnsLookupService } from './dns-lookup.service';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { SmtpHandshakeService } from './smtp-handshake.service';

@Controller('email-validator')
export class EmailValidatorController {
  constructor(
    private readonly dnsLookupservice: DnsLookupService,
    private readonly smtpHandshakeService: SmtpHandshakeService,
  ) {}
  @Post('validador')
  @HttpCode(200)
  async ValidadorController(@Body() recebeemailvalidado: ValidateEmailDto) {
    const dnsinfo =
      await this.dnsLookupservice.ValidadorDNSEmail(recebeemailvalidado);
    const servidormx = dnsinfo.resultado[0].servidor;
    //const caixaExiste = await this.smtpHandshakeService.ValidadorCaixaEmail(recebeemailvalidado);

    return {
      statusDns: dnsinfo.message,
      servertestado: dnsinfo,
     // caixaexiste: caixaExiste ? 'sim' : 'não',
    };
  }

  @Get('validador')
  ola(): string {
    return this.dnsLookupservice.ola();
  }
}
