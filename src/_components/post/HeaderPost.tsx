
interface IHeaderProps {
    comp: any
}

export default function (props: IHeaderProps) {
    return (
        <div className="offset-2 col-8 header">
            <props.comp.global.Avatar />
            <h1>Rafael Schüng</h1>
            <div className='header-description'>
                <nav>
                    <ul>
                        <li><a href='/'>Site pessoal 🔗</a></li>
                        <li><a href='/blog'>Blog 📖</a></li>
                        <li><a href='/about'>Sobre-mim ❔</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}