import type {} from "react/types"

const profileImg = './assets/home/images/profile.jpg'

const SecondColumn = () => (
    <>
        <div className='col second-column' style={{ backgroundImage: `url(${profileImg})` }}></div>
    </>
);

export default SecondColumn;