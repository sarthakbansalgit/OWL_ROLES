import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="cursor-pointer group"
    >
      <style>{`
        @keyframes fadeInUpStagger { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .latest-card { animation: fadeInUpStagger 0.6s ease-out; }
        .latest-badge { transition: all 0.3s ease; }
        .latest-button { position: relative; overflow: hidden; }
        .latest-button::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: rgba(255,255,255,0.2); transition: left 0.4s ease; }
        .latest-button:hover::before { left: 100%; }
      `}</style>
      
      <div className="latest-card bg-white border-2 border-gray-100 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col group-hover:scale-105 group-hover:-translate-y-3">
        {/* Header with Logo */}
        <div className="flex gap-3 md:gap-4 items-start mb-3 md:mb-4 group-hover:translate-x-2 transition-transform duration-300">
          <Avatar className="w-10 md:w-12 h-10 md:h-12 rounded-lg border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-100 flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
            <AvatarImage
              src={job?.company?.logo}
              className="w-full h-full object-cover rounded-lg"
            />
            <AvatarFallback className="bg-blue-200 text-blue-700 font-bold text-sm md:text-base">
              {job?.company?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-sm md:text-lg text-gray-900 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">{job?.title}</h3>
            <p className="text-xs md:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{job?.company?.name}</p>
          </div>
        </div>

        {/* Location */}
        <p className="text-xs md:text-sm text-gray-500 mb-2 group-hover:text-gray-700 transition-colors duration-300">📍 {job?.location || "Location not specified"}</p>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2 flex-grow group-hover:text-gray-700 transition-colors duration-300">
          {job?.description}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-3 md:mb-4">
          <Badge className="latest-badge bg-blue-100 text-blue-700 border border-blue-200 text-xs md:text-sm group-hover:bg-blue-200 group-hover:shadow-md">
            {job?.position} Positions
          </Badge>
          <Badge className="latest-badge bg-blue-100 text-blue-700 border border-blue-200 text-xs md:text-sm group-hover:bg-blue-200 group-hover:shadow-md">
            {job?.jobType}
          </Badge>
          <Badge className="latest-badge bg-blue-100 text-blue-700 border border-blue-200 text-xs md:text-sm group-hover:bg-blue-200 group-hover:shadow-md">
            ₹{job?.salary} LPA
          </Badge>
        </div>

        {/* Button */}
        <Button className="latest-button w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold rounded-lg text-sm md:text-base py-2 md:py-3 transition-all duration-300 active:scale-95 group-hover:shadow-lg">
          View Details →
        </Button>
      </div>
    </div>
  );
};


export default LatestJobCards;
