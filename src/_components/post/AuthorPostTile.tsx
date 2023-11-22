export default function ({comp}: any ) {
    return (
        <div className="offset-2 col-8 tile">
            <comp.global.Avatar />
            <div className='description'>
                <h1>Rafael Schueng</h1>
                <span>O cara que escreveu o conteúdo que você acabou de ler... 😎</span>
                <nav>
                    <ul>
                        <li><a href='/'>🔗 Site pessoal</a></li>
                        <li><a href='/blog'>📖 Blog</a></li>
                        <li><a href='/about'>❔ Sobre-mim</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}