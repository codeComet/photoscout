import Newsletter from "../newsletter/Newsletter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <Newsletter />
      <div className="max-w-7xl mx-auto pt-5 px-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-white">PhotoScout</div>
        <div className="text-sm">
          © {new Date().getFullYear()} PhotoScout. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
