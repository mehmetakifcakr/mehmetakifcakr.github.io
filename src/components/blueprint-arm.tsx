export function BlueprintArm({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 540 500" fill="none" className="arm-blueprint" role="img" aria-label={label}>
      <defs>
        <pattern id="arm-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" className="svg-grid" />
        </pattern>
        <linearGradient
          id="arm-metal"
          x1="100"
          y1="0"
          x2="300"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--arm-face)" />
          <stop offset="1" stopColor="var(--surface)" />
        </linearGradient>
      </defs>
      <path fill="url(#arm-grid)" d="M0 0h540v500H0z" />
      <g className="svg-grid">
        <path d="m45 416 241-131 222 123-239 139Z" />
        <path d="m83 436 239-131M128 460l239-131M173 484l238-131M219 510l238-131M88 393l222 123M132 369l222 123M176 345l222 123M220 321l222 123" />
      </g>
      <g stroke="var(--text-dim)" strokeWidth="1.4" strokeLinejoin="round">
        <path d="m132 397 102-56 107 59-101 57Z" fill="var(--surface-2)" />
        <path d="M132 397v18l108 60v-18Zm108 60 101-57v18l-101 57" fill="var(--surface)" />
        <path d="m173 385 62-34 64 36-62 35Z" fill="var(--arm-face)" />
        <path d="M173 385v13l64 36v-12Zm64 37 62-35v13l-62 34" fill="var(--surface-2)" />
        <path d="M208 375v-62l28-16 29 17v62l-29 17Z" fill="url(#arm-metal)" />
        <path d="M236 297v96m-28-80 28 16 29-15" />
        <path d="m220 313-60-122 27-16 61 121Z" fill="var(--arm-face)" />
        <path
          d="m220 313 17 10 28-16-17-11m-88-105 17 10 60 122m-60-122 27-16 61 122"
          fill="url(#arm-metal)"
        />
        <path d="m176 184 26 14 92-78-26-15Z" fill="var(--arm-face)" />
        <path d="m202 198 14 14 91-79-13-13m-26-15 13 14 26 14" fill="url(#arm-metal)" />
        <path d="m291 123 63 43 17-11-64-44Z" fill="var(--arm-face)" />
        <path d="m291 123 1 18 62 43v-18m0 0 17-11v18l-17 11" fill="url(#arm-metal)" />
        <path d="m366 166 26 15-13 24-13-8 8-14-14-8Z" fill="var(--surface-2)" />
        <path d="m352 179 17 10-9 18-13-8 6-12-9-5Z" fill="var(--arm-face)" />
        <ellipse
          cx="238"
          cy="318"
          rx="16"
          ry="23"
          transform="rotate(-30 238 318)"
          fill="var(--surface)"
        />
        <ellipse
          cx="190"
          cy="194"
          rx="14"
          ry="21"
          transform="rotate(-30 190 194)"
          fill="var(--surface)"
        />
        <ellipse
          cx="295"
          cy="123"
          rx="12"
          ry="17"
          transform="rotate(-30 295 123)"
          fill="var(--surface)"
        />
      </g>
      <g stroke="var(--accent)" strokeWidth="1.5">
        <path d="m226 305 22 13m-70-132 23 14m84-85 20 12M225 371v-29" />
        <circle cx="238" cy="318" r="6" />
        <circle cx="190" cy="194" r="5" />
        <circle cx="295" cy="123" r="4" />
        <path d="M378 211v18m-9-9h18" />
      </g>
      <g className="svg-dimension">
        <path d="M105 173v239m-7-232 14-14m-14 253 14-14M158 174h-60m26 239H98M191 89h118m-111-7-14 14m118-14 14 14M190 156V80m119 22V80M395 169h65v79h-45" />
        <circle cx="415" cy="248" r="3" fill="var(--accent)" />
      </g>
      <g className="svg-label">
        <text x="66" y="299" transform="rotate(-90 66 299)">
          6 DOF
        </text>
        <text x="230" y="70">
          IK / FK
        </text>
        <text x="405" y="158">
          TCP
        </text>
        <text x="341" y="329">
          Z
        </text>
        <text x="408" y="374">
          X
        </text>
        <text x="321" y="395">
          Y
        </text>
      </g>
      <g stroke="var(--text-dim)" strokeWidth="1">
        <path d="M350 376v-38m0 38 42-13m-42 13-17 14" />
        <path d="m346 343 4-7 4 7m31 16 9 3-6 6m-52 15-5 8 9-2" />
      </g>
    </svg>
  );
}
