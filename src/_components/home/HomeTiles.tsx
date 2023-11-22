import type { } from 'react/types'

export default function () {
    const tiles = [
        {
            title: 'Sobre Mim',
            description: 'Saiba mais sobre quem é Rafael Schueng.',
            icon: '❔',
            href: '/about'
        },
        {
            title: 'Blog Pessoal',
            description: 'Nessa seção do site eu coloco alguns artigos e textos sobre coisas que eu gosto.',
            icon: '📖',
            href: '/blog'
        },
        {
            title: 'LinkedIn',
            description: 'Acompanhe minha trajetoria profissional no LinkedIn.',
            icon: '💼',
            href: 'https://www.linkedin.com/in/rafael-schueng'
        },
        {
            title: 'Github',
            description: 'Veja meus projetos pessoais...',
            icon: '👨‍💻',
            href: 'https://github.com/rafaelschueng'
        },
    ];

    return (
        <>
            {tiles.map((tile, index) => (
                <a key={index} href={tile.href}>
                    <h3>{tile.title}</h3>
                    <span>{tile.description}</span>
                    <h1 className="text-end">{tile.icon}</h1>
                </a>
            ))}
        </>
    )
}