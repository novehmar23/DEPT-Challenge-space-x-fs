import { Launch } from "types";
import { addFavorite, removeFavorite } from "api/favorites";
import { ReactComponent as Star } from "assets/images/star.svg";
import "./index.scss";

interface LaunchCardProps {
  launch: Launch;
  launchIndex: number;
  setLaunchesMap: Function;
}

export const LaunchCard = ({ launch, setLaunchesMap }: LaunchCardProps) => {
  const handleClickFavorite = async () => {
    try {
      const newFavoriteState = !launch.favorite;

      if (newFavoriteState) {
        await addFavorite(launch.flight_number);
      } else {
        await removeFavorite(launch.flight_number);
      }

      setLaunchesMap((prevMap: Map<number, Launch>) => {
        const newMap = new Map(prevMap);
        newMap.set(launch.flight_number, {
          ...launch,
          favorite: newFavoriteState,
        });
        return newMap;
      });
    } catch (error) {
      console.error("Error updating favorite: ", error);
    }
  };

  return (
    <div className="launch-card">
      <div
        className="patch"
        style={{ backgroundImage: `url(${launch.mission_patch})` }}
      />
      <div className="content">
        <h3>{launch.mission_name}</h3>
        <span className="details">{launch.details}</span>
        <span className="date">
          {new Date(launch.launch_date_unix * 1000).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}
        </span>
        <Star
          onClick={handleClickFavorite}
          className={launch.favorite ? "active" : ""}
        />
      </div>
    </div>
  );
};
