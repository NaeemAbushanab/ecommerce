import ReactLoading from "react-loading";
import "./LoadingScreen.css";
function LoadingScreen({ children, isLoading = true, displayWithChildren = false }) {
  if (isLoading) {
    return (
      <>
        <div className={`${displayWithChildren && "floatingLoading"} py-5`}>
          <i>
            <ReactLoading type="spin" width={50} height={50} color="#0d6efd" className="m-auto" />
          </i>
        </div>
        {displayWithChildren && children}
      </>
    );
  }
  return children;
}

export default LoadingScreen;
