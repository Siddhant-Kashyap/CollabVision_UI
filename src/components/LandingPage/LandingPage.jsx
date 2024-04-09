import NavBar from "../NavBar/NavBar";
import heroimg from "../../assets/heroimage.png";
import Footer from "../Footer/Footer";
const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <div
          className="flex-1 bg-[#7dd3fc] flex justify-center items-center "
          style={{ height: "80vh" }}
        >
          <img src={heroimg} alt="hero-image" />
        </div>
        <div
          className="flex-1 bg-[#7dd3fc] flex justify-center items-center"
          style={{ height: "80vh" }}
        >
          <div className="flex-row">
            <h1 className="font-protestriot  text-5xl"> Attention !</h1>
            <p className="font-robotomono text-2xl">
              Streamline Your Productivity, One Task at a Time – Your Ultimate
              Task Management Companion
            </p>
            <br/>
            {/* <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Get It Free
            </button> */}
          </div>

          <div></div>
        </div>
      </div>
      <Footer/>
      
    </>
  );
};

export default LandingPage;
