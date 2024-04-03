import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageRedux } from "../../store/features/catsSlice";
import styles from "./main.module.scss";

function Main() {
    const {
        cats: { catsList },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    const changePage = () => {
        dispatch(changePageRedux());
    };

    useEffect(() => {
        catsList.length > 10 &&
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
    }, [catsList]);
    return (
        <div className={styles.main_component}>
            {catsList.map((item) => {
                return (
                    <div key={item.id} className={styles.cat_item}>
                        <img src={item.url} alt="cat" />
                    </div>
                );
            })}
            <p className={styles.load_more_btn} onClick={changePage}>
                Load More
            </p>
        </div>
    );
}

export default Main;
