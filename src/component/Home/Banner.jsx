

const Banner = () => {
    return (
        <div className="relative w-full  text-white py-16 px-8 text-center min-h-full shadow-lg">
        <div className=" ">
          <h1 className="text-4xl font-bold mb-4">TaskPilot - Stay Organized & Productive</h1>
          <p className="text-lg mb-6">
            Manage your tasks efficiently with TaskPilot. Plan, track, and complete tasks effortlessly.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition">
            Get Started
          </button>
        </div>
      </div>
    );
};

export default Banner;