import styles from './nav.module.css'
import { Link } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';
export function Nav() {
    const currentUser = UserAuth().user

    return(
        <nav className={`Nav ${styles.container}`}>
            <h3>Navigation</h3>
            <ul className={styles.list}>
                <li className={styles.listElement}>
                    <Link to={'/'}>Home</Link>
                </li>
                <li className={styles.listElement}>
                    <Link to={currentUser ? '/friends' : '/auth'}>Friends</Link>
                </li>
                <li className={styles.listElement}>
                    <Link to={currentUser ? '/MyPosts' : '/auth'}>My Posts</Link>
                </li>
            </ul>
        </nav>
    )
}