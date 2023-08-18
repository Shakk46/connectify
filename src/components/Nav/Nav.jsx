import styles from './nav.module.css'
import { Link } from "react-router-dom";
export function Nav() {
    return(
        <nav className={`Nav ${styles.container}`}>
            <h3>Navigation</h3>
            <ul className={styles.list}>
                <li className={styles.listElement}>
                    <Link to={'/'}>Home</Link>
                </li>
                <li className={styles.listElement}>
                    <Link to={'/'}>Friends</Link>
                </li>
                <li className={styles.listElement}>
                    <Link to={'/'}>My Posts</Link>
                </li>
            </ul>
        </nav>
    )
}