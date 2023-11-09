interface IProps {
    animated: boolean
}

export default function Avatar(props: IProps) {
    if (props.animated) {
        return <img className="avatar" src='/assets/images/profile/profile_animated.gif' />
    }
    return <img className="avatar" src='/assets/images/profile/profile.jpg' />
}