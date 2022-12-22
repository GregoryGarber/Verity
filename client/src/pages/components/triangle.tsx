import React from "react";

type Props = {
  angle: number;
};

function RightTriangle(props: Props) {
  console.log(window.innerWidth);
  const triangleSide = window.innerWidth * 0.2; // size of the triangle's sides
  //   const hypotenuse = Math.sqrt(
  //     Math.pow(triangleSide, 2) + Math.pow(triangleSide, 2)
  //   ); // length of the hypotenuse using Pythagorean theorem

  return (
    <svg width={triangleSide} height={triangleSide}>
      <g
        transform={`rotate(${props.angle} ${triangleSide / 2} ${
          triangleSide / 2
        })`}
      >
        <path
          d={`M 0 0 L ${triangleSide} 0 L 0 ${triangleSide} Z`}
          fill="white"
          stroke="#236978"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

export default RightTriangle;
