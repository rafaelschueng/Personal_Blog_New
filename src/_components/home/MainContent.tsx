import type { } from "react/types";
import type { PageData } from 'lume/core.ts'

interface ICustomProps {
    comp:any
    children:any
    footer: boolean
}

export default function (props: ICustomProps) {
    return (
        <>
            <props.comp.global.Avatar animated />
            <div className="header text-center"><h2>👋 Olá, meu nome é</h2><h1>Rafael Schüng</h1></div>
            <div className="description">
                Nos últimos 6 anos desenvolvo e mantenho sistemas que integram e processam dados do SalesForce utilizando JavaScript, Node.js, Loopback, PostgreSQL e Heroku.
                Também trabalhei em soluções e microsserviços construídos em C# e .NET 5.0 para diversas empresas.
            </div>
            {(props.footer)? <Footer/> : <></>}
        </>
    )
}

function Footer() {
    return (
        <div className="footer">
            <ul>
                <li><a href="/about">❔ Sobre Mim</a></li>
                <li><a href="/blog">📖 Blog Pessoal</a></li>
                <li><a href="https://www.linkedin.com/in/rafael-schueng">💼 LinkedIn</a></li>
                <li><a href="https://github.com/rafaelschueng">👨‍💻 Github</a></li>
            </ul>
        </div>
    )
}
