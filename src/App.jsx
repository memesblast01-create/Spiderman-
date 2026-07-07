import { useCallback, useState } from "react";
import { useImageSequence } from "./hooks/useImageSequence.js";
import { useLenis } from "./hooks/useLenis.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
import CanvasSequence from "./components/CanvasSequence.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import Outro from "./components/Outro.jsx";
import CinematicOverlay from "./components/CinematicOverlay.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

export default function App() {
  const { imagesRef, progress, isLoaded, hasError, totalFrames } = useImageSequence();
  const [loadingScreenVisible, setLoadingScreenVisible] = useState(true);

  useLenis(isLoaded);

  const handleLoadingExited = useCallback(() => {
    setLoadingScreenVisible(false);
  }, []);

  return (
    <>
      {loadingScreenVisible && (
        <LoadingScreen progress={progress} hasError={hasError} onExited={handleLoadingExited} />
      )}

      {isLoaded && <CustomCursor />}

      {isLoaded && <SiteHeader />}

      {isLoaded && <CanvasSequence imagesRef={imagesRef} totalFrames={totalFrames} />}

      {isLoaded && <Outro />}

      {isLoaded && <CinematicOverlay />}
    </>
  );
}
