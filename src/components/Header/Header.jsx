import { Link, useLocation } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import styles from './header.module.css'
import { ScreenContext } from '../../context/ScreenSizeContext'

export function Header() {
    const userAuth = UserAuth()
    const currentUser = userAuth.user

    const screenSize = ScreenContext()

    const location = useLocation()
    return (
        <header className={styles.container}>
            {
                screenSize.width < 986 && <Burger />
            }
            
            <div className={styles.left}>
                <img src="https://images-platform.99static.com/4FslyiYuyggP-6AZ3iRPNlH4AlY=/102x102:921x921/500x500/top/smart/99designs-contests-attachments/120/120926/attachment_120926609" alt="logo" className={styles.logo}/>
                <h2>Connectify</h2>
            </div>

            <div className={styles.right}>
                <Link to={userAuth.user ? `/profile?id=${currentUser.uid}` : '/auth'} state={currentUser && currentUser.uid} className={styles.profile}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3106/3106773.png" alt="profile icon" />
                    Profile
                </Link>
            </div>
        </header>
    )
}


const Burger = () => {
    // Доделать клик и меню
    return (
        <div className={styles.burger}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png" alt="burger" />
        </div>
    )
}