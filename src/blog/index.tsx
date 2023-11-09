import type { } from "react/types";

export default function ({ comp }: any) {
  return (
    <html lang="en">
      <head>
        <comp.global.GlobalHeaderTags title='Rafael Schueng Blog' />
        <link href="/assets/blog/styles/blog.css" rel="stylesheet" />
      </head>
      <body>
        <div className='container-fluid'>
          <div className="row">
            <div className='col-4 fixed-top floating-cover text-center'>
              <comp.global.Avatar />
              <div>
                <h2>👋 Olá, Bem vindo ao meu Blog!</h2>
                <div className="description">
                  Nos últimos 6 anos desenvolvo e mantenho sistemas que integram e processam dados do SalesForce utilizando JavaScript, Node.js, Loopback, PostgreSQL e Heroku.
                  Também trabalhei em soluções e microsserviços construídos em C# e .NET 5.0 para diversas empresas.
                </div>
                <ul>
                  <li><a href="/about">❔ Sobre Mim</a></li>
                  <li><a href="/blog">📖 Blog Pessoal</a></li>
                  <li><a href="https://www.linkedin.com/in/rafael-schueng">💼 LinkedIn</a></li>
                  <li><a href="https://github.com/rafaelschueng">👨‍💻 Github</a></li>
                </ul>
              </div>
            </div>
            <div className='col-8 offset-4 posts'>
              <div>
                <h4>✍🏻​ Postagens Recentes:</h4>
                <comp.global.BlogPostsTiles datetime description />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}