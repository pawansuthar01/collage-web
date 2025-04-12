import { motion } from "framer-motion";
export const CourseSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 w-[350px] bg-gray-300" />
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-2/3" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="flex justify-end space-x-2 pt-4">
          <div className="h-8 w-8 bg-gray-300 rounded-md" />
          <div className="h-8 w-8 bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};
export const NoticeSkeleton = () => {
  return (
    <motion.div className="bg-[var(--cardBg-color)] p-6 rounded-lg shadow-md animate-pulse">
      <div className="flex justify-between items-start">
        <div className="w-full space-y-3">
          <div className="w-24 h-6 bg-gray-300 rounded-full" />
          <div className="w-2/3 h-6 bg-gray-300 rounded" />
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-3/4 h-4 bg-gray-200 rounded" />
        </div>
        <div className="w-16 h-4 bg-gray-300 rounded" />
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <div className="h-9 w-9 bg-gray-300 rounded-lg" />
        <div className="h-9 w-9 bg-gray-300 rounded-lg" />
      </div>
    </motion.div>
  );
};
export const CourseApplySkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          </td>
        </tr>
      ))}
    </>
  );
};
