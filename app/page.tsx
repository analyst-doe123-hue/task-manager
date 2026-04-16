export default function Home() {
  return (
    <div className="relative">
      {/* Decorative blurred circles – now relative to the card container */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* Main content card – no extra full‑screen sizing */}
      <div className="relative max-w-3xl mx-auto text-center backdrop-blur-sm bg-white/30 rounded-3xl shadow-2xl p-8 md:p-12 border border-white/40">
        {/* Icon / Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-4 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
          Smart Task Manager
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700 font-medium">
          Organize your tasks efficiently with a modern web app.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/tasks"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg hover:bg-white/80 transition-all duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Feature teaser */}
        <div className="mt-12 pt-8 border-t border-white/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-medium">Add tasks quickly</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Mark as complete</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6" />
            </svg>
            <span className="font-medium">Filter & organize</span>
          </div>
        </div>
      </div>
    </div>
  );
}