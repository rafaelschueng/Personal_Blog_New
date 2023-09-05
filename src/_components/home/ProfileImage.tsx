import type { } from "react/types";

const profileImg = './assets/home/images/profile.jpg'

const ProfileImage = () => (
    <>
        <div className='profile'>
            <img src={profileImg} alt="He is Rafael Schueng" />
        </div>
    </>
);

export default ProfileImage