import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton({ id }) {
  const { setCurrentMusic, isPlaying, setIsPlaying, currentMusic } = usePlayerStore(
    (state) => state
  );

  const isPlayingPlayList = isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {
    if(isPlayingPlayList) {
      setIsPlaying(false);
      return;
    }
    setCurrentMusic({
      playlist: {
        id
      }
    });

    fetch(`/api/get-info-playlist.json?id=${id}`)
     .then(response => response.json())
     .then(data => {
      const {songs, playlist} = data;
      setIsPlaying(true);
      setCurrentMusic({songs, playlist, song: songs[0]});
      console.log("Hola");
      console.log({songs, playlist})
     });
  };

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4"
    >
      {isPlayingPlayList ? <Pause /> : <Play />}
    </button>
  );
}
