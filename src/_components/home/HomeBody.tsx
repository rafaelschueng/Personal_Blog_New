import type { } from 'react/types';

import BlogColumn from './BlogColumn.tsx';
import ProjectsColumn from './ProjectsColumn.tsx';
import AboutColumn from './AboutColumn.tsx';

import ProfileImage from './ProfileImage.tsx';

const logoImg = './assets/global/logo_wide.svg'

const HomeBody = () => (
  <body>
    <div className='container-fluid'>
      <div className='row vh-100 subcontainer'>
        <div className='col-2 first-column'>
          <div className='logo'>
            <img src={logoImg} alt="This is my logo" />
          </div>
        </div>
        <div className='col presentation-column'>
          <div className='navigation text-center'>

            <div className='navigation-option'>
              <nav>
                <a href='/blog' className='blog'>Blog</a>
              </nav>
            </div>

            <div className='navigation-option'>
              <nav>
                <a href='https://github.com/rafaelschueng/' className='github'>Projects</a>
              </nav>
            </div>

            <div className='navigation-option'>
              <nav>
                <a href='/about' className='about'>About</a>
              </nav>
            </div>

          </div>

          <div className='message'>
            <h1>A Brazilian Software Engineer living in São Paulo.</h1>
          </div>
        </div>
      </div>
    </div>
  </body>
);

export default HomeBody;