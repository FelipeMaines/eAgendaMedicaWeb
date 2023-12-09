# e-Agenda Médica

Bem-vindo(a) ao e-Agenda Médica, uma solução web para a gestão eficiente de cronogramas em clínicas médicas. Desenvolvido como projeto final da Academia do Programador 2023, este sistema visa otimizar o agendamento de consultas e cirurgias, proporcionando uma experiência simplificada e segura.

## Tecnologias e Ferramentas de Frontend:

- Angular: Framework JavaScript para construção do frontend da aplicação.
- Bootstrap: Biblioteca de design e estilos para facilitar a criação de interfaces responsivas.
- TypeScript: Superset do JavaScript que adiciona tipagem estática ao código.
- HTML: Linguagem de marcação utilizada para estruturar o conteúdo da aplicação.
- Sass: Linguagem para estilizar a página.
- Angular Material: Biblioteca para auxiliar nos componentes da página.

## Tecnologias e Ferramentas de Backend:

- C#: Linguagem de programação principal para o desenvolvimento do backend.
- Entity Framework Core: Ferramenta de mapeamento objeto-relacional (ORM) para interação com o banco de dados.
- SQL Server: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados.
- Visual Studio: Ambiente no qual foi desenvolvido o projeto do backend.
- .NET 6.0: Framework no qual foi desenvolvido o projeto do backend.
- ASP.NET: Plataforma da Microsoft para o desenvolvimento de aplicações Web.

## Instalação

### Pré-requisitos
Antes de iniciar, certifique-se de atender aos seguintes requisitos:
- .NET 6 SDK,
- Node.js, npm, e
- SQL Server.

### Configurando o Back-End

Entre no projeto: [eAgendaMedicaAPI]https://github.com/FelipeMaines/EAgendaMedicaAPI

1. Clone o repositório.
2. No Visual Studio, abra o Package Manager Console e selecione como projeto padrão:
    ```
    Infra/Orm/EAgendaMedica.Infra.Orm
    ```
3. Execute os seguintes comandos:
    ```powershell
    Add-Migration CloneMigration
    Update-Database
    ```

### Build e Execute a Aplicação:

- Aperte F5 ou rode o projeto.

### Arrumando o Front-End

1. Clone o repositório [eAgendaMedicaWeb](https://github.com/FelipeMaines/eAgendaMedicaWeb).
2. Abra o Visual Studio Code.
3. Inicie um novo terminal.
4. Execute o seguinte comando:
    ```bash
    npm install
    ```

### Configurando a URL

1. Vá para `src/environments/environment.development.ts`.
2. Deixe a `ApiUrl` como:
    ```typescript
    apiUrl: 'https://localhost:7181/api/'
    ```

### Para Iniciar a Aplicação, Execute no Console:

```bash
ng serve --open
