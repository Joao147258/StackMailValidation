/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidateEmailDto } from './dto/validate-email.dto';
import * as net from 'net';

@Injectable()
export class SmtpHandshakeService {
  async ValidadorCaixaEmail(emailAlvo: ValidateEmailDto) {
    const [nome, dominio] = emailAlvo.EmailValidado.split('@');

    return new Promise((resolve, reject) => {
      let etapa = 0;
      let caixaExiste = false;

      const socket = net.createConnection(25, dominio);

      socket.on('data', (data) => {
        const resposta = data.toString();
        // return `Servidor diz ${resposta}`;

        if (etapa === 0 && resposta.startsWith('220')) {
          socket.write(`HELO ${dominio}\r\n`);
          etapa++;
        } else if (etapa === 1 && resposta.startsWith('250')) {
          // Servidor aceitou o oi. Dizemos quem somos
          socket.write(`MAIL FROM:<${nome}@${dominio}>\r\n`);
          etapa++;
        } else if (etapa === 2 && resposta.startsWith('250')) {
          // A HORA DA VERDADE: Perguntamos se a caixa do usuário alvo existe
          socket.write(`RCPT TO:<${emailAlvo}>\r\n`);
          etapa++;
        } else if (etapa === 3) {
          if (resposta.startsWith('250')) {
            // Sucesso! A caixa de entrada aceitou receber mensagens.
            caixaExiste = true;
          } else if (resposta.startsWith('550')) {
            // Erro 550 = User Unknown (Usuário não existe ou caixa lotada)
            caixaExiste = false;
          }
          // Encerramos a conexão e vamos embora (Drop Connection)
          socket.write('QUIT\r\n');
          socket.end();
            resolve(caixaExiste);
            return caixaExiste;
        }
        
      });
      socket.on('error', (err) => {
        reject(
          new BadRequestException('Falha na conexão SMTP: ' + err.message),
        );
      });

      // Timeout de segurança para a conexão não ficar pendurada para sempre
      socket.setTimeout(10000, () => {
        socket.end();
        reject(
          new BadRequestException('Timeout ao tentar conectar no servidor MX.'),
        );
      });
    });
  }
}
