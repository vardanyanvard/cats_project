import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCtasByIdAsync, resetCatsListRedux } from "../../store/features/catsSlice";

function Header() {
    const dispatch = useDispatch();
    const {
        cats: { categoriesList, page },
    } = useSelector((state) => state);
    const [categoriId, setCategoriId] = useState();

    const changeId = (id) => {
        dispatch(resetCatsListRedux());
        setCategoriId(id);
    };

    useEffect(() => {
        if (categoriesList.length) {
            setCategoriId(categoriesList[0].id);
        }
    }, [categoriesList]);

    useEffect(() => {
        if (categoriId) {
            dispatch(getCtasByIdAsync({ page, categoriId }));
        }
    }, [categoriId, page, dispatch]);

    useEffect(() => {
        dispatch(getCategoriesAsync());
    }, [dispatch]);

    return (
        <div className={styles.main_header}>
            {categoriesList.map((item) => {
                return (
                    <p
                        key={item.id}
                        onClick={() => changeId(item.id)}
                        className={`${categoriId === item.id && styles.selected}`}
                    >
                        <span>{item.name}</span>
                    </p>
                );
            })}
        </div>
    );
}

export default Header;
