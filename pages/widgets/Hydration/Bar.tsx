import React, { useState } from 'react'

interface BarProps {
	cups: number
}

const Bar: React.FC<BarProps> = ({ cups }) => {
	return (
		<>
			<svg
				width='130'
				height='318'
				viewBox='0 0 130 318'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				{cups >= 8 ? (
					<path
						d='M108 77H22.5L36 62V43.5C36 42.7 34 41.1667 33 40.5C33 38.3333 33.2 33.9 34 33.5C34.8 33.1 36.3333 29.6667 37 28L37.5 9L43 4.5C57.6667 4.33334 87.3 4.1 88.5 4.5C89.7 4.9 91.3333 6.33334 92 7.00001L92.5 25L97 31L98.5 38L94.5 42.5L95.5 65L108 77Z'
						fill='#6EC7F9'
					/>
				) : null}
				{cups >= 7 ? (
					<path
						d='M125 101.43V117H3.50612L2 114.924V100.911C2 99.6658 5.01224 95.5485 6.51837 93.6456L11.5388 84.3038L19.0694 76H106.927L115.461 84.3038L122.992 93.6456L125 101.43Z'
						fill='#6EC7F9'
					/>
				) : null}
				{cups >= 6 ? (
					<rect x='5' y='117' width='123' height='33' fill='#6EC7F9' />
				) : null}{' '}
				{cups >= 5 ? (
					<rect x='4' y='150' width='123' height='33' fill='#6EC7F9' />
				) : null}
				{cups >= 4 ? (
					<rect x='5' y='183' width='119' height='33' fill='#6EC7F9' />
				) : null}
				{cups >= 3 ? (
					<rect x='5' y='216' width='119' height='33' fill='#6EC7F9' />
				) : null}
				{cups >= 2 ? (
					<rect x='5' y='249' width='121' height='33' fill='#6EC7F9' />
				) : null}
				{cups >= 1 ? (
					<rect x='3' y='282' width='123' height='33' fill='#6EC7F9' />
				) : null}
				<path
					d='M64.5839 315H123.626C125.465 315 127 313.209 127 311V254.16C127 253.143 126.391 252.273 125.557 252.099C125.244 252.034 124.953 251.868 124.714 251.619L123.82 250.688C123.699 250.563 123.587 250.427 123.483 250.283L122.816 249.358C122.413 248.797 122.146 248.112 122.048 247.38L121.937 246.559C121.877 246.116 121.88 245.663 121.945 245.221L121.993 244.896C122.126 243.993 122.514 243.172 123.09 242.571L124.733 240.861C124.961 240.623 125.231 240.451 125.522 240.357C126.394 240.075 127 239.126 127 238.041V223.264C127 222.163 126.331 221.228 125.425 221.063C125.197 221.021 124.977 220.929 124.777 220.79L123.914 220.191C123.731 220.064 123.559 219.916 123.399 219.75L122.966 219.299C122.467 218.779 122.111 218.087 121.947 217.318C121.88 217.002 121.846 216.678 121.846 216.352V215.149C121.846 214.719 121.904 214.292 122.017 213.884L122.311 212.826C122.549 211.968 123.023 211.231 123.655 210.738L124.599 210L125.34 209.485C126.367 208.769 127 207.45 127 206.023V194.961C127 193.669 126.32 192.519 125.305 192.094C125.155 192.032 125.01 191.952 124.873 191.856L124.286 191.449C123.86 191.153 123.494 190.748 123.214 190.262L122.648 189.279C122.353 188.767 122.161 188.179 122.089 187.561L121.919 186.115C121.871 185.707 121.875 185.294 121.933 184.888L122.043 184.103C122.145 183.382 122.41 182.707 122.808 182.154L123.272 181.509C123.515 181.172 123.803 180.886 124.124 180.663L124.85 180.159C125.003 180.053 125.164 179.968 125.332 179.905C126.324 179.535 127 178.432 127 177.184V102.973C127 102.764 126.986 102.556 126.959 102.35L126.575 99.418C126.538 99.1401 126.477 98.8676 126.393 98.605L125.56 96L124.119 92.5L122.898 89.9567C122.753 89.6535 122.575 89.3746 122.369 89.1272L116.437 82L112.596 78.5L102.034 70L96.7098 66.3039C96.4197 66.1025 96.1565 65.8495 95.9291 65.5536L94.8203 64.1101C94.5111 63.7077 94.274 63.2332 94.1237 62.7161L93.4013 60.2313C93.2781 59.8072 93.2151 59.3613 93.2151 58.9122V45.419C93.2151 43.7106 94.1395 42.1819 95.4841 41.627C95.6869 41.5433 95.8854 41.4351 96.0711 41.3062L96.7304 40.8485C97.0618 40.6184 97.3524 40.3124 97.5858 39.9479C97.9792 39.3332 98.1926 38.5796 98.1926 37.8041V35.4053C98.1926 34.4957 97.9346 33.6132 97.4611 32.9035L97.3979 32.8087C97.2818 32.6348 97.1539 32.4728 97.0154 32.3245L95.7128 30.9294C95.4506 30.6486 95.1289 30.4602 94.7833 30.3849C93.8753 30.1871 93.2151 29.2371 93.2151 28.1283V10.1259C93.2151 9.39568 93.0488 8.67937 92.7341 8.05465L92.3186 7.22983C92.0762 6.74869 91.7521 6.33437 91.3675 6.01392L89.9254 4.81251C89.6765 4.60514 89.4052 4.43956 89.1191 4.32035L87.4655 3.63154C87.2555 3.54407 87.0388 3.48208 86.8185 3.44652L84.3699 3.05115C84.1591 3.0171 83.9458 3 83.7323 3H65.1565'
					stroke='black'
					strokeWidth='5'
				/>
				<path
					d='M66 315H6.40553C4.54985 315 3 313.209 3 311V254.16C3 253.143 3.61494 252.273 4.45697 252.099C4.77199 252.034 5.06614 251.868 5.30774 251.619L6.21001 250.688C6.33139 250.563 6.44506 250.427 6.55017 250.283L7.22274 249.358C7.63032 248.797 7.89896 248.112 7.99868 247.38L8.11056 246.559C8.17098 246.116 8.1682 245.663 8.10234 245.221L8.05399 244.896C7.91953 243.993 7.52839 243.172 6.94612 242.571L5.2881 240.861C5.05801 240.623 4.7857 240.451 4.49166 240.357C3.61165 240.075 3 239.126 3 238.041V223.264C3 222.163 3.67543 221.228 4.58927 221.063C4.82003 221.021 5.04219 220.929 5.24427 220.79L6.11484 220.191C6.2994 220.064 6.4734 219.916 6.63447 219.75L7.07155 219.299C7.5759 218.779 7.93469 218.087 8.09989 217.318C8.16759 217.002 8.20183 216.678 8.20183 216.352V215.149C8.20183 214.719 8.14357 214.292 8.0293 213.884L7.73308 212.826C7.49252 211.968 7.01437 211.231 6.37677 210.738L5.42308 210L4.67584 209.485C3.6386 208.769 3 207.45 3 206.023V194.961C3 193.669 3.68636 192.519 4.71074 192.094C4.86221 192.032 5.00838 191.952 5.14728 191.856L5.7397 191.449C6.16943 191.153 6.53883 190.748 6.82133 190.262L7.39297 189.279C7.69097 188.767 7.88426 188.179 7.95743 187.561L8.12894 186.115C8.17725 185.707 8.17246 185.294 8.11474 184.888L8.00313 184.103C7.90045 183.382 7.63339 182.707 7.23104 182.154L6.7624 181.509C6.5174 181.172 6.2268 180.886 5.90261 180.663L5.16999 180.159C5.01612 180.053 4.85283 179.968 4.68313 179.905C3.68209 179.535 3 178.432 3 177.184V102.973C3 102.764 3.0137 102.556 3.04099 102.35L3.42926 99.418C3.46606 99.1401 3.52739 98.8676 3.61223 98.605L4.45385 96L5.9077 92.5L7.14022 89.9567C7.28713 89.6535 7.46683 89.3746 7.67472 89.1272L13.6615 82L17.5385 78.5L28.2 70L33.5735 66.3039C33.8664 66.1025 34.1321 65.8495 34.3615 65.5536L35.4808 64.1101C35.7928 63.7077 36.0321 63.2332 36.1839 62.7161L36.913 60.2313C37.0374 59.8072 37.1009 59.3613 37.1009 58.9122V45.419C37.1009 43.7106 36.1679 42.1819 34.8107 41.627C34.606 41.5433 34.4056 41.4351 34.2182 41.3062L33.5528 40.8485C33.2183 40.6184 32.9249 40.3124 32.6894 39.9479C32.2923 39.3332 32.0769 38.5796 32.0769 37.8041V35.4053C32.0769 34.4957 32.3373 33.6132 32.8152 32.9035L32.879 32.8087C32.9962 32.6348 33.1253 32.4728 33.2651 32.3245L34.5799 30.9294C34.8446 30.6486 35.1692 30.4602 35.5181 30.3849C36.4345 30.1871 37.1009 29.2371 37.1009 28.1283V10.1259C37.1009 9.39568 37.2688 8.67937 37.5865 8.05465L38.0058 7.22983C38.2505 6.74869 38.5776 6.33437 38.9658 6.01392L40.4214 4.81251C40.6726 4.60514 40.9465 4.43956 41.2353 4.32035L42.9043 3.63154C43.1163 3.54407 43.3351 3.48208 43.5574 3.44652L46.0347 3.05022C46.2436 3.01679 46.4549 3 46.6665 3H65.422'
					stroke='black'
					strokeWidth='5'
				/>
			</svg>
		</>
	)
}

export default Bar
