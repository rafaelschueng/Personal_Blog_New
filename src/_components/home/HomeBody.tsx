import type { } from "react/types";

export default function ({ comp }: any) {
  return (
    <body>
      <div className="container g-0 vh-100">
        <div className="row g-0 vh-100">
          <div className="col main">
            <img className="avatar" src='./assets/images/profile/profile_animated.gif' />
            <div className="header text-center"><h2>👋 Olá, meu nome é</h2><h1>Rafael Schüng</h1></div>
            <div className="description">
              Nos últimos 6 anos desenvolvo e mantenho sistemas que integram e processam dados do SalesForce utilizando JavaScript, Node.js, Loopback, PostgreSQL e Heroku.
              Também trabalhei em soluções e microsserviços construídos em C# e .NET 5.0 para diversas empresas.
            </div>
            <div className="footer">
              <ul>
                <li><a href="/about">❔ Sobre Mim</a></li>
                <li><a href="/blog">📖 Blog Pessoal</a></li>
                <li><a href="/linkedin">💼 LinkedIn</a></li>
                <li><a href="https://github.com/rafaelschueng">👨‍💻 Github</a></li>
              </ul>
            </div>
          </div>
          <div className="col preview">
            <comp.home.TrendingBlogPosts />
          </div>
        </div>
      </div>
    </body>
  )
}
