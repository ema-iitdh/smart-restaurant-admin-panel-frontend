import React from 'react'

const SkeletonLoader = ({
	width = '100%',
	height = '20px',
	margin = '10px 0',
}) => {
	return (
		<div
			style={{
				width: width,
				height: height,
				margin: margin,
				backgroundColor: '#e0e0e0',
				borderRadius: '4px',
				animation: 'pulse 1.5s ease-in-out infinite',
			}}
		>
			<style>
				{`
          @keyframes pulse {
            0% {
              opacity: 0.6;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              opacity: 0.6;
            }
          }
        `}
			</style>
		</div>
	)
}

export default SkeletonLoader
