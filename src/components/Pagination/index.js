import React, { useCallback, useMemo } from "react";
import { usePagination, DOTS } from "./usePagination";
import styles from "./pagination.module.scss";

const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    // Memoize event handlers with useCallback
    const onNext = useCallback(() => {
        onPageChange(currentPage + 1);
    }, [onPageChange, currentPage]);

    const onPrevious = useCallback(() => {
        onPageChange(currentPage - 1);
    }, [onPageChange, currentPage]);

    // Memoize the last page calculation
    const lastPage = useMemo(() => paginationRange[paginationRange.length - 1], [paginationRange]);

    return (
        <ul className={`${styles.paginationContainer} ${className}`}>
            <li className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ""}`} onClick={onPrevious}>
                <div className={`${styles.arrow} ${styles.left}`} />
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li key={`dots-${index}`} className={`${styles.paginationItem} ${styles.dots}`}>&#8230;</li>;
                }

                return (
                    <li key={`page-${pageNumber}`} className={`${styles.paginationItem} ${pageNumber == currentPage ? styles.selected : ""}`} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}
            <li className={`${styles.paginationItem} ${currentPage === lastPage ? styles.disabled : ""}`} onClick={currentPage === lastPage ? null : onNext}>
                <div className={`${styles.arrow} ${styles.right}`} />
            </li>
        </ul>
    );
};

// Wrap the component with React.memo to prevent unnecessary re-renders
export default React.memo(Pagination);
