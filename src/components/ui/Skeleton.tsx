import React from 'react';

export const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FBF9F5] border border-[#D8D2C7]/60 overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-[16/11] bg-[#D8D2C7]/40 w-full" />
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-[#D8D2C7]/50 w-24 rounded-sm" />
          <div className="h-4 bg-[#D8D2C7]/40 w-16 rounded-sm" />
        </div>
        <div className="h-7 bg-[#D8D2C7]/60 w-3/4 rounded-sm" />
        <div className="h-4 bg-[#D8D2C7]/40 w-1/2 rounded-sm" />
        <div className="pt-4 border-t border-[#D8D2C7]/40 flex justify-between items-center mt-auto">
          <div className="h-6 bg-[#D8D2C7]/60 w-28 rounded-sm" />
          <div className="h-4 bg-[#D8D2C7]/40 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export const AgentCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FBF9F5] border border-[#D8D2C7]/60 overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-[#D8D2C7]/40 w-full" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-6 bg-[#D8D2C7]/60 w-1/2 rounded-sm" />
        <div className="h-4 bg-[#D8D2C7]/40 w-2/3 rounded-sm" />
        <div className="h-3 bg-[#D8D2C7]/30 w-full rounded-sm" />
        <div className="h-3 bg-[#D8D2C7]/30 w-4/5 rounded-sm" />
      </div>
    </div>
  );
};
