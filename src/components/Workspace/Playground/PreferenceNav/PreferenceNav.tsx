import React, { useState, useEffect } from 'react'
import { AiOutlineSetting, AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'

type PreferencenavProps = {}

const PreferenceNav: React.FC<PreferencenavProps> = ({}) => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const handleFullScreen = () => {
		if(isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

  return (
    <div className='flex items-center justify-between bg-zinc-800 h-11 w-full'>
        	<div className='flex items-center text-white'>
				<button className='flex cursor-pointer items-center rounded focus:outline-none bg-gray-500 text-dark-label-2 hover:bg-zinc-800  px-2 py-1.5 font-medium'>
					<div className='flex items-center px-1'>
						<div className='text-xs text-label-2 dark:text-dark-label-2'>JavaScript</div>
					</div>
				</button>
			</div>

			<div className='flex items-center m-2'>
				<button className='preferenceBtn group'>
					<div className='h-4 w-4 text-gray-400 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip'>Settings</div>
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-gray-400 font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceBtn-tooltip'>Full Screen</div>
				</button>
			</div>
    </div>
  )
}

export default PreferenceNav