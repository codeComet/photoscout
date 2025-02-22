import { Bell, Shield } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 border border-x-0 border-t-0 border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Stay Updated with Image Search
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Subscribe to our newsletter for the latest updates on new image
              sources, API features, and tips for optimizing your image searches
              across platforms.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <Bell
                  size={36}
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Platform Updates
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Get notified about new image sources, API updates, and feature
                releases to enhance your image search experience.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <Shield
                  aria-hidden="true"
                  size={36}
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                API Usage Tips
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Receive expert tips on optimizing your API usage, managing
                quotas, and getting the most out of each platform.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* Keep the existing background blur effect */}
    </div>
  );
}
