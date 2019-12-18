# Drop Files
Autores: Pedro Soares e Diogo Perdigão

# Atividade Final Programação Web com Node

Opção escolhida:

Vocês foram contratados pela empresa SM Tech para desenvolver um sistema de armazenamento dearquivos, similar ao dropbox e google drive. O cliente solicitou que cada usuário tivesse a possibilidadede armazenar os seus arquivos na nuvem e serem consultados por meio de um sistema personalizado.

## Requisitos:
- Por questões de segurança, o sistema deve possuir algum tipo de autenticação (login e logout utilizando passport.js, auth0, firebase auth, manualmente na base de dados ou qualquer outrotipo de autenticação);
- O upload dos arquivos deve ser feito em algum serviço de nuvem (amazon s3, azure storage,google cloud storage...);
- Deverá ter uma tela para listagem de todos os arquivos e seus nomes;
- Deverá ser possível inserir e remover arquivos (não é necessário editar os nomes dos arquivos);

## Requisitos comuns:
- Todos os trabalhos deverão ser entregues em alguma plataforma git (github, gitlab,bitbucket...);
- Os trabalhos deverão ser acessíveis por meio de algum domínio (sugestão: utilizar zeit/now,netlify, heroku, surge.sh, AWS, Azure...);
- Os trabalhos poderão seguir a abordagem de RESTFull ou MVC;
- Poderá ser utilizado qualquer banco de dados nas soluções acima, seja local ou “as a service”.

## URL's
GET /user
- 200 success
```json
{
    'displayName' : 'usuario us',
    'avatar' : "urldoavatar"
}
```
- 401 error unlogged user

GET /files

- 200 success
```json
[
    {'name' : 'usuario.txt', 'url' : "https://s3.aws.com/urlprivadadoarquivo"},
    {'name' : 'usuario1.txt', 'url' : "https://s3.aws.com/urlprivadadoarquivo1"},
]
```
- 500 error list files
```
list files error
```
- 401 error unlogged user

DELETE /files

- 200 success
```
ok
```
- 500 error delete file
```
delete file error
```
- 401 error unlogged user

POST /files

- 201 success
```
ok
```
- 413 error max size exceeded > 10 mb
```
max size exceeded
```
- 500 upload file error
```
Fail to upload File
```
- 401 error unlogged user
