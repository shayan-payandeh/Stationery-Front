function Order() {
  const styleSvg = {
    fill: "none",
    strokeWidth: 2,
    // strokeLinecap: "round",
    // strokeLinejoin: "round",
    strokeMiterlimit: 10,
  };
  return (
    <>
      <svg
        version="1.1"
        id="Icons"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        width="100%"
        height="100%"
        opacity={0.7}
      >
        <line
          style={styleSvg}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="fill-none"
          stroke="var(--color-primary-500)"
          x1="6"
          y1="17"
          x2="16"
          y2="17"
        ></line>
        <line
          style={styleSvg}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--color-primary-500)"
          x1="3"
          y1="14"
          x2="13"
          y2="14"
        ></line>
        <path
          style={styleSvg}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--color-dark-500)"
          d="M29,8l-2,11L9.4,21.8C8.6,21.9,8,22.6,8,23.4v0C8,24.3,8.7,25,9.6,25H27"
        ></path>
        <path
          style={styleSvg}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--color-dark-500)"
          d="M5,4L5,4c2.3,0,3.8,2.4,2.8,4.5L7,10"
        ></path>
        <line
          style={styleSvg}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--color-dark-500)"
          x1="3"
          y1="4"
          x2="5"
          y2="4"
        ></line>
        <line
          style={{
            fill: "none",
            strokeWidth: 0.9,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 10,
          }}
          stroke="#7a7a7a"
          x1="7"
          y1="10"
          x2="28"
          y2="10"
        ></line>
        <circle
          style={styleSvg}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--color-primary-500)"
          cx="11"
          cy="27"
          r="2"
        ></circle>
        <circle
          style={styleSvg}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="var(--color-primary-500)"
          cx="24"
          cy="27"
          r="2"
        ></circle>
        <rect
          x="-504"
          style={{
            fill: "none",
          }}
          width="536"
          height="680"
        ></rect>
      </svg>
    </>
  );
}

export default Order;
