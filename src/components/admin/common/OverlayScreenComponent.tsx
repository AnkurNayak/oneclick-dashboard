import useUiHelper from "@/hooks/useUiHelper";
import useWindowWidth from "@/hooks/useWindowWidth";

const OverlayScreenComponent = () => {
  const { handleSidenav } = useUiHelper();
  const windowWidth = useWindowWidth();

  if (windowWidth && windowWidth >= 960) return null;

  return (
    <div
      className="overlay-screen backdrop-blur"
      onClick={() => handleSidenav(false)}
    ></div>
  );
};

export default OverlayScreenComponent;
