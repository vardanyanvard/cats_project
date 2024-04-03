import { useSelector } from "react-redux";
import styles from "./loading.module.scss";

function Loading() {
    const {
        cats: { mainLoading },
    } = useSelector((state) => state);

    if (!mainLoading) return <></>;

    return <div className={styles.loading}></div>;
}

export default Loading;
