import styles from './SuspenseFallback.module.scss';
// Images
import casinoImage from '../../assets/images/casino.png';

const SuspenseFallback = (): JSX.Element =>  {

    return (
        <div className={styles.imageContainer}>
            <img src={casinoImage} className={styles.brandLogo} />
        </div>
    );
}

export default SuspenseFallback;