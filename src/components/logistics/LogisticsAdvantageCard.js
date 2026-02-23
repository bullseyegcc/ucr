import React from "react";

export default function LogisticsAdvantageCard({
  index,
  count,
  title,
  description,
  borderColor = "",
  hoverBorderColor = "",
  numberColor = "",
  className = "",
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  return (
    <div
      className={`border-t-2 flex gap-6 lg:gap-5 pt-6 lg:pt-9 ${borderColor} ${hoverBorderColor} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <h1 className={`text-4xl lg:text-6xl min-w-fit ${numberColor}`}>{count}</h1>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg lg:text-2xl font-semibold ">{title}</h1>
        <p className="text-sm lg:text-lg">{description}</p>
      </div>
    </div>
  );
}
