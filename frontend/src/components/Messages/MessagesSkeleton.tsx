import React from 'react';

interface MessagesSkeletonProps {
  count?: number;
}

export const MessagesSkeleton: React.FC<MessagesSkeletonProps> = ({
  count = 5,
}) => {
  return (
    <ul>
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <>
            <div className="flex gap-3 items-center">
              <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-1">
                <div className="skeleton h-4 w-40"></div>
                <div className="skeleton h-4 w-40"></div>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-end">
              <div className="flex flex-col gap-1">
                <div className="skeleton h-4 w-40"></div>
                <div className="skeleton h-4 w-40"></div>
              </div>
              <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
            </div>
          </>
        </li>
      ))}
    </ul>
  );
};
