import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 6 skeleton items (reduced from 8 for better mobile display)
  const skeletonContacts = Array(6).fill(null);

  return (
    <aside
      className="h-full w-full sm:w-20 lg:w-80 max-w-[20rem] border-r border-base-300 
      flex flex-col transition-all duration-300 bg-base-100 shadow-sm md:shadow-none"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-base-content" />
          <span className="font-semibold text-lg hidden sm:block">
            Chat Contacts
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="flex-1 overflow-y-auto w-full py-3 px-2 sm:px-3">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full p-3 flex items-center gap-3 hover:bg-base-200 
            rounded-lg transition-colors duration-200 cursor-pointer"
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto sm:mx-0">
              <div className="skeleton size-10 sm:size-12 rounded-full animate-pulse" />
              {/* Online status indicator skeleton */}
              <div className="skeleton absolute bottom-0 right-0 size-3 rounded-full" />
            </div>

            {/* User info skeleton */}
            <div className="hidden sm:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-3/4 sm:w-32 mb-2 animate-pulse" />
              <div className="skeleton h-3 w-1/2 sm:w-24 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer - visible only on mobile */}
      <div className="sm:hidden border-t border-base-300 p-3">
        <div className="skeleton h-8 w-full rounded-lg animate-pulse" />
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
