# Recuperaçã de Senha
**RF** Requisitos Funcionais
[x] O usuário deve poder recuperar sua senha informando o seu e-mail;
[x] O usuário deve receber um e-mail com instruções de recuperação de senha;
[x] O usuário deve poder resetar sua senha;


**RNF** Requisitos não Funcionais
[x] Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
[x] Utilizar o Amazon SES para envios em produção;
[x] O envio de e-mails deve acontecer em segundo plano (background job)

**RN** Regras de Negócio
[x] O link enviado por e-mail de resetar senha, deve expirar em 2h;
[x] O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil
**RF**
[x] O usuário deve poder atualizar seu nome, email e senha.

**RNF** Requisitos não Funcionais
[x] n/a

**RN** Regras de Negócio (deve sempre estar atrelada a um requisito funcional.)
[x] O usuário não pode alterar seu e-mail para um e-mail já utilziado;
[x] Para atualizar sua senha, o usuário deve informar a senha antiga;
[x] Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# Painel do prestador
**RF**
- O usuário deve poder listar seus agendamentos de um da especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
 - os agendamentos do prestador no dia deve ser armazenados em cache;
 - as notificações do prestador deve ser armazenadas no MongoDB;
 - as notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN** Regras de Negócio
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar.

# Agendamento de serviços
**RF**
- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário dispobivel de um prestador;
- O usuário deve poder listar horários disponíveis em um dia expecifico de um prestardor;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;


**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18 (primeiro as 8h, último ás 17h)
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar um serviço consigo mesmo;

