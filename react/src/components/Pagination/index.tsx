import { useMemo, Dispatch, SetStateAction } from "react";
import { ReactComponent as ChevronLeftIcon } from "assets/images/chevron-left.svg";
import "./index.scss";

interface PaginationProps {
  itemsCount: number;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}

export const CARDS_PER_PAGE: number = 6;

export const Pagination = ({
  itemsCount,
  value,
  onChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(itemsCount / CARDS_PER_PAGE);

  const handlePreviousPage = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleNextPage = () => {
    if (value < totalPages) {
      onChange(value + 1);
    }
  };

  const renderPages = useMemo(() => {
    const pages = [];

    if (totalPages > 0) {
      pages.push(
        <div
          key={1}
          onClick={() => onChange(1)}
          className={value === 1 ? "active" : ""}
        >
          1
        </div>
      );
    }

    if (value > 3) {
      pages.push(<div key="three-dots-start">...</div>);
    }

    const startPage = Math.max(2, value - 1);
    const endPage = Math.min(totalPages - 1, value + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <div
          key={i}
          onClick={() => onChange(i)}
          className={value === i ? "active" : ""}
        >
          {i}
        </div>
      );
    }

    if (value < totalPages - 2) {
      pages.push(<div key="three-dots-end">...</div>);
    }

    if (totalPages > 1) {
      pages.push(
        <div
          key={totalPages}
          onClick={() => onChange(totalPages)}
          className={value === totalPages ? "active" : ""}
        >
          {totalPages}
        </div>
      );
    }

    return pages;
  }, [totalPages, value, onChange]);

  return !!itemsCount ? (
    <div className="pagination">
      <ChevronLeftIcon
        className={`chevron-left ${value === 1 ? "disabled" : ""}`}
        onClick={handlePreviousPage}
      />
      {renderPages}
      <ChevronLeftIcon
        className={`chevron-right ${value === totalPages ? "disabled" : ""}`}
        onClick={handleNextPage}
      />
    </div>
  ) : null;
};
