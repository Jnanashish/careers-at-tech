import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./CategoryGrid.module.scss";

const CategoryGrid = ({ categories, promptsByCategory }) => {
    const handleClick = (categoryKey) => {
        const el = document.getElementById(`category-${categoryKey}`);
        if (el) {
            const headerOffset = 80;
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className={styles.grid}>
            {categories.map((cat) => {
                const count = promptsByCategory[cat.key]?.length || 0;
                return (
                    <button
                        key={cat.key}
                        className={styles.categoryCard}
                        onClick={() => handleClick(cat.key)}
                        aria-label={`View ${cat.label} prompts`}
                    >
                        <div className={styles.cardBody}>
                            <h3 className={styles.categoryLabel}>{cat.label}</h3>
                            <p className={styles.categoryDescription}>{cat.description}</p>
                            <div className={styles.cardFooter}>
                                <span className={styles.count}>{count} prompts</span>
                                <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight} />
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryGrid;
