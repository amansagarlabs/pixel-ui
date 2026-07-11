import * as React from "react";

export function ContrastIcon({
  size = 24,
  color = "currentColor",
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <clipPath id="contrast-left-half">
          <path d="M12 2.75A9.25 9.25 0 0 0 12 21.25V2.75Z" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="8.75" stroke={color} strokeWidth="2.25" />
      <path d="M12 3.25v17.5" stroke={color} strokeWidth="2.25" strokeLinecap="round" />
      <g clipPath="url(#contrast-left-half)">
        <path d="M2.5 5.25 12.75 11.25" stroke={color} strokeWidth="2.35" strokeLinecap="butt" />
        <path d="M1.8 10 12.75 16.4" stroke={color} strokeWidth="2.35" strokeLinecap="butt" />
        <path d="M2.6 15.35 12.75 21.25" stroke={color} strokeWidth="2.35" strokeLinecap="butt" />
      </g>
    </svg>
  );
}
