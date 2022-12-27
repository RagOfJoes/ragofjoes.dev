import { splitProps } from 'solid-js';

import { IconProps } from 'solid-icons';

const Logo = (props: IconProps) => {
  const [{ size }, other] = splitProps(props, ['color', 'size']);

  return (
    <svg
      {...other}
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect rx="80" width="512" height="512" class="fill-ctp-base" />
      <rect
        x="128"
        y="360.533"
        height="48"
        width="76.8"
        class="fill-ctp-text"
      />
      <path
        class="fill-ctp-blue"
        d="M384 408.533C352.029 408.533 322.226 401.717 296.965 380.634C271.703 359.551 247.951 333.352 240 300.035L306.037 272C309.217 285.327 330.077 310.821 340.182 319.254C350.287 327.688 371.212 342.814 384 342.814V408.533Z"
      />
      <rect
        x="128"
        y="205.867"
        width="76.8"
        height="117.333"
        class="fill-ctp-text"
      />
      <path
        class="fill-ctp-text"
        d="M128 210.133C128 188.327 136.02 167.044 150.98 149.153C165.94 131.261 187.121 117.62 211.67 110.068C236.218 102.516 262.955 101.415 288.277 106.914C313.599 112.412 336.291 124.247 353.294 140.822C370.298 157.397 380.797 177.918 383.377 199.618C385.956 221.318 380.493 243.156 367.722 262.19C354.951 281.223 335.487 296.537 311.952 306.069C288.416 315.602 261.941 318.894 236.091 315.502L248.036 252.281C258.376 253.637 268.967 252.321 278.381 248.508C287.795 244.695 295.581 238.569 300.689 230.956C305.797 223.342 307.982 214.607 306.951 205.927C305.919 197.247 301.719 189.039 294.918 182.409C288.116 175.779 279.04 171.045 268.911 168.845C258.782 166.646 248.087 167.086 238.268 170.107C228.449 173.128 219.976 178.584 213.992 185.741C208.008 192.898 204.8 201.411 204.8 210.133L128 210.133Z"
      />
    </svg>
  );
};

export default Logo;
