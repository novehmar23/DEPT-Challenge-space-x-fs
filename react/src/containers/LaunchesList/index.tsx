import { useEffect, useContext, useState } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { getLaunches } from "../../api";
import "./index.scss";

export const LaunchesList = () => {
  const [launchesMap, setLaunchesMap] = useState<Map<number, Launch>>(
    new Map()
  );
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const { showAll } = useContext(ModeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => setCurrentPage(1), [showAll]);

  const filterLaunches = () => {
    const launchesArray = Array.from(launchesMap.values());

    return setFilteredLaunches(
      launchesArray.filter((l: Launch) => {
        const favoriteFilter = showAll || l.favorite;

        const searchFilter =
          !searchText ||
          (l.mission_name &&
            l.mission_name.toLowerCase().includes(searchText.toLowerCase()));

        return favoriteFilter && searchFilter;
      })
    );
  };

  const loadLaunches = async () => {
    try {
      const launchesArray = await getLaunches();
      const newMap = new Map();
      launchesArray.forEach((launch) => {
        newMap.set(launch.flight_number, launch);
      });
      setLaunchesMap(newMap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLaunches();
  }, []);

  useEffect(filterLaunches, [searchText, showAll, launchesMap]);

  useEffect(() => {
    const launchesInPage = filteredLaunches.filter(
      (_: Launch, i: number) =>
        i >= CARDS_PER_PAGE * (currentPage - 1) &&
        i < CARDS_PER_PAGE * currentPage
    );
    if (launchesInPage.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [filteredLaunches, currentPage]);

  return (
    <div className="launches-list-container">
      <Search
        value={searchText}
        onChange={setSearchText}
        total={filteredLaunches.length}
      />
      <div className="launches-list">
        {filteredLaunches
          .filter(
            (_: Launch, i: number) =>
              i >= CARDS_PER_PAGE * (currentPage - 1) &&
              i < CARDS_PER_PAGE * currentPage
          )
          .map((launch, i) => {
            return (
              <LaunchCard
                key={launch.flight_number + i}
                launch={launch}
                launchIndex={i}
                setLaunchesMap={setLaunchesMap}
              />
            );
          })}
      </div>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        itemsCount={filteredLaunches.length}
      />
    </div>
  );
};
