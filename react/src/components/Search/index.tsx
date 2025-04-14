import { SetStateAction, Dispatch } from "react";
import searchIcon from "assets/images/search.svg";
import closeIcon from "assets/images/close.svg";
import "./index.scss";

interface SeachProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  total?: number;
}

export const Search = ({ value, onChange, total }: SeachProps) => {
  const clear = () => {
    onChange("");
  };

  return (
    <div className="search-wrapper">
      {total !== undefined && (
        <span className="search-total">Total ({total})</span>
      )}
      <div className="search-input">
        <img className="search-icon" src={searchIcon} alt="Search" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search all launches"
        />
        <img
          className="close-icon"
          src={closeIcon}
          onClick={clear}
          alt="Close"
        />
      </div>
    </div>
  );
};
