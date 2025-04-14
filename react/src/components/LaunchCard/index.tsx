import { Launch } from "types";
import { addFavorite, removeFavorite } from "api/favorites";
import { ReactComponent as Star } from "assets/images/star.svg";
import "./index.scss";

interface LaunchCardProps {
  launch: Launch;
  launchIndex: number;
  setLaunches: Function;
}

export const LaunchCard = ({
  launch,
  launchIndex,
  setLaunches,
}: LaunchCardProps) => {
  const handleClickFavorite = async () => {
    try {
      const newFavoriteState = !launch.favorite;

      if (newFavoriteState) {
        await addFavorite(launch.flight_number);
      } else {
        await removeFavorite(launch.flight_number);
      }

      setLaunches((prevLaunches: Launch[]) => {
        const updatedLaunches = [...prevLaunches];
        updatedLaunches[launchIndex] = {
          ...updatedLaunches[launchIndex],
          favorite: newFavoriteState,
        };
        return updatedLaunches;
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
