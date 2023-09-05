import type { } from 'react/types';

const logoImg = './assets/global/logo_wide.svg'

const FirstColumn = () => (
    <>
        <div className='col-3 first-column' style={{ backgroundImage: `url(${logoImg})` }} ></div>
    </>  
);
export default FirstColumn