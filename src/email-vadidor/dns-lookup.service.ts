/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-empty */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { promises as dns } from 'dns';

@Injectable()
export class DnsLookupService {
  async ValidadorDNSEmail(emailValidado: ValidateEmailDto) {
    const [nome, dominio] = emailValidado.EmailValidado.split('@');
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      const mxRecords = await dns.resolveMx(dominio);

      if (mxRecords && mxRecords.length > 0) {
        const listaregistro = mxRecords.map((registros) => {
          return {
            servidor: registros.exchange,
            prioridade: registros.priority,
          };
        });

        return {
          message: `Registros MX encontrados para ${nome}@${dominio}`,
          resultado: listaregistro,
        };
      } else {
        throw new BadRequestException(
          `Nenhum servidor de E-mail para ${dominio}`,
        );
      }
    } catch (erro) {
      if (erro instanceof BadRequestException) {
        throw erro;
      }
      throw new BadRequestException(
        `Falha na rede ao buscar o domínio ${dominio}. Verifique se ele existe e se está digitado corretamente.`,
      );
    }
  }

  ola() {
    return 'ola mundo';
  }
}
