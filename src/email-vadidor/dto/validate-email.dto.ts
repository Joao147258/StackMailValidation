import { IsEmail, MaxLength } from 'class-validator';

export class ValidateEmailDto {
  @IsEmail({}, { message: 'Formato de E-mail invalido' })
  @MaxLength(40, { message: 'Quantidade máxima de caracteres excedida' })
  EmailValidado!: string;
}

/**========================================================================
 *                             COMMENT BLOCK
 *  Quando usamos decoradores complexos, é preciso declarar quais regras queremos usar, no caso do @IsEmail {}  O objeto de opções vazio indica que não exigimos nenhuma formatação
 * específica ou restrição de provedor. Ele aceitará qualquer terminação
 * (.com, .com.br, comercial ou pessoal), garantindo apenas que a string
 * respeita o padrão universal de e-mails., no caso de @MaxLength o 40 indica o numero máximo de caracteres.
 *========================================================================**/
