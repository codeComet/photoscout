import Newsletter from "../newsletter/Newsletter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 sm:py-6">
      <Newsletter />
      <div className="max-w-7xl mx-auto pt-3 sm:pt-5 px-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 sm:gap-0">
        <div className="text-lg sm:text-xl font-semibold text-white">
          PhotoScout
        </div>
        <div className="text-xs sm:text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://devbishal.netlify.app"
            target="_blank"
            className="underline text-[#16A44B]"
          >
            Bishal
          </a>
        </div>
        <div className="text-xs sm:text-sm text-center">
          © {new Date().getFullYear()} PhotoScout. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
