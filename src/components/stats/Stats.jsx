import CountUp from "../ui/CountUp/CountUp";
import * as motion from "motion/react-client";

const Stats = () => {
  return (
    <div className="py-24 bg-[#0a0f18]">
      <motion.div // Animate when this value changes:
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: .8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Universal Image Search Platform
            </h2>
            <p className="text-lg text-gray-400">
              Search millions of images across multiple platforms in one place
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-8 bg-[#131B2F] rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp
                  from={0}
                  to={10}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                +
              </div>
              <div className="text-sm text-gray-400">Integrated Platforms</div>
            </div>
            <div className="p-8 bg-[#131B2F] rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                M+
              </div>
              <div className="text-sm text-gray-400">Searchable Images</div>
            </div>
            <div className="p-8 bg-[#131B2F] rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp
                  from={0}
                  to={500}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                K+
              </div>
              <div className="text-sm text-gray-400">Monthly Searches</div>
            </div>
            <div className="p-8 bg-[#131B2F] rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp
                  from={0}
                  to={99}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                %
              </div>
              <div className="text-sm text-gray-400">Search Success Rate</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Stats;
