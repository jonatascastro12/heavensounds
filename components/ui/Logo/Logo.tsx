const Logo = ({
  className = '',
  logotipo = true,
  height = '50px',
  viewBox = '0 0 350.73 64.28',
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={logotipo ? '0 0 350.73 64.28' : '0 0 100.73 64.28'} height={height}>
    <defs></defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          fill="#6930c3"
          d="M92.05,23.39C87.23,15,76.91,11.8,66.76,14.45,60.16-8.92,18-2.51,16.22,23.39,10,23.25.52,30.57.07,45.82,0,48.31-.57,53.08,3.21,53a3.13,3.13,0,0,0,3.14-3.14c.1-4-.51-9,2.25-13.46,6.6-9,13.89-6.86,13.89-6.86C19.81,5.3,57.36-5.5,63.34,21.6c15.34-3.27,27.88-1.65,26,25.06v3.2c-.06,4.07,5.94,4.07,6.28,0C96.09,44.48,97.57,33.07,92.05,23.39Z"
        />
        <path
          fill="#6930c3"
          d="M20.7,41.42a2.91,2.91,0,0,0-5.81,0h0v13h0a1,1,0,0,0,0,.17,2.92,2.92,0,1,0,5.83,0,1,1,0,0,0,0-.17h0v-13Z"
        />
        <path
          fill="#56cfe1"
          d="M73.05,41.42a2.92,2.92,0,0,0-5.82,0h0v13h0c0,.06,0,.11,0,.17a2.92,2.92,0,1,0,5.84,0c0-.06,0-.11,0-.17h0v-13Z"
        />
        <path
          fill="#5e60ce"
          d="M31.17,37.16a2.91,2.91,0,0,0-5.81,0h0V58.72h0a1,1,0,0,0,0,.17,2.92,2.92,0,1,0,5.83,0,1,1,0,0,0,0-.17h0V37.16Z"
        />
        <path
          fill="#48bfe3"
          d="M62.58,37.16a2.91,2.91,0,0,0-5.82,0h0V58.72h0c0,.06,0,.12,0,.17a2.92,2.92,0,0,0,5.84,0s0-.11,0-.17h0V37.16Z"
        />
        <path
          fill="#4ea8de"
          d="M52.11,34.69a2.92,2.92,0,0,0-5.82,0h0v26.5h0v.17a2.92,2.92,0,1,0,5.83,0c0-.06,0-.11,0-.17h0V34.69Z"
        />
        <path
          fill="#5390d9"
          d="M41.64,46.13a2.91,2.91,0,0,0-5.81,0h0v3.62h0a1,1,0,0,0,0,.17,2.92,2.92,0,1,0,5.83,0c0-.06,0-.11,0-.17h0V46.13Z"
        />
        <path
          fill="#72efdd"
          d="M83.52,46.13a2.92,2.92,0,0,0-5.82,0h0v3.62h0c0,.06,0,.11,0,.17a2.92,2.92,0,0,0,5.84,0c0-.06,0-.11,0-.17h0V46.13Z"
        />
        {logotipo ? (
          <text
            fill="var(--text-primary)"
            fontSize="28.39px"
            fontFamily="Inter"
            fontWeight="700"
            transform="translate(110.44 45.86)"
          >
            Heaven Sounds
          </text>
        ) : (
          ''
        )}
      </g>
    </g>
  </svg>
)

export default Logo
