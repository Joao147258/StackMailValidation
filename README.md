# StackMail Validation API 🛡️✉️

Um motor de processamento e validação de e-mails de alta performance e multi-camadas, construído com **NestJS**. Esta API foi desenhada com foco em resiliência, economia de recursos de rede e princípios de *Domain-Driven Design* (DDD).

## 🏗️ Arquitetura: O Padrão Orquestrador

Diferente de aplicações CRUD tradicionais, o StackMail opera como um motor lógico puro. O coração do sistema utiliza o **Facade Pattern** através de um Orquestrador central que rege serviços especialistas isolados. 

O fluxo de dados adota o princípio arquitetural de **Fail-Fast** (Falhar Rápido): a validação ocorre em camadas de esforço progressivo. Se um e-mail falha na primeira barreira (offline), o processamento é interrompido imediatamente, poupando a infraestrutura de consultas de rede ou alocação de memória desnecessárias.

### 🚦 As Camadas de Defesa

1. **A Alfândega (DTO):** Utiliza `class-validator` para higienizar e bloquear payloads maliciosos ou vazios na porta do `Controller`, garantindo o contrato da API antes do processamento lógico.
2. **Camada 1 - Segurança da Porta (Sintaxe):** Motor offline baseado em Regex (RFC 5322). Valida o formato, normaliza a string e atua como *Typo Fixer* para erros de digitação comuns de provedores.
3. **Camada 2 - Inteligência de Ameaças (Reputação):** Camada de segurança de negócio. Cruza o domínio validado contra uma base de *Spam Traps* e e-mails descartáveis/temporários.
4. **Camada 3 - Investigador de Endereços (DNS):** Acesso de rede primário. Isola o domínio e consulta servidores globais nativamente (`node:dns`) em busca de registros MX (*Mail Exchange*) ativos.

## 💻 Instalação e Execução
