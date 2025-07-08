// Right Side
const WelcomeMessageBoxComponent = () => {
  return (
    <div className="relative hidden md:flex flex-auto items-center justify-center w-1/2 h-full p-16 lg:px-28 overflow-hidden bg-primary">
      <svg
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 pointer-events-none ng-tns-c1192603091-0"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="100"
          className="text-orange-700 opacity-25 ng-tns-c1192603091-0"
        >
          <circle r="234" cx="196" cy="23"></circle>
          <circle r="234" cx="790" cy="491"></circle>
        </g>
      </svg>
      <svg
        viewBox="0 0 220 192"
        width="220"
        height="192"
        fill="none"
        className="absolute -top-16 -right-16 text-orange-700 ng-tns-c1192603091-0"
      >
        <defs className="ng-tns-c1192603091-0">
          <pattern
            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="220"
          height="192"
          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
        ></rect>
      </svg>
      <div className="z-10 relative w-full max-w-2xl">
        <div className="text-6xl lg:text-7xl font-bold leading-none text-gray-100">
          <div>Welcome to</div>
          <div>Admin Dashboard</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessageBoxComponent;
