import { CloudOff, RefreshCw, Home } from "lucide-react";

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <CloudOff size={120} />
          </div>
          <div className="relative">
            <CloudOff className="mx-auto text-red-500 mb-4" size={48} />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Unable to Load Data
            </h1>
            <p className="text-gray-600">
              We're having trouble connecting to our servers. This might be due
              to your internet connection or our servers might be experiencing
              issues.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Error Code: DATA_FETCH_ERROR
            </p>
            <p className="text-sm text-gray-500">
              Timestamp: {new Date().toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw size={18} className="mr-2" />
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Home size={18} className="mr-2" />
              Return Home
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            If this problem persists, please contact our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
