import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter as solidTwitter } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp as solidWhatsapp } from '@fortawesome/free-brands-svg-icons';
import useSound from 'use-sound';
import muskImg from './assets/musk.png';
import zuckImg from './assets/zuck.png';

const meterOption = Object.freeze({
	1: 'worst1',
	2: 'average1',
	3: 'perfect',
	4: 'average2',
	5: 'worst2',
})

const teamMotoOption = Object.freeze({
	'musk': "Team Rocket",
	'zuck': "Team Privacy"
})

const Meter = ({ position }) => {
	let firstDivBorder = "";
	let secondDivBorder = "";
	let thirdDivBorder = "";
	let fourthDivBorder = "";
	let fifthDivBorder = "";

	switch (position) {
		case "worst1":
			firstDivBorder = "border-4 [box-shadow:0_8px_0_0_rgb(200,200,200)]";
			break;
		case "average1":
			secondDivBorder = "border-4 [box-shadow:0_8px_0_0_rgb(200,200,200)]";
			break;
		case "perfect":
			thirdDivBorder = "border-4 [box-shadow:0_8px_0_0_rgb(200,200,200)]";
			break;
		case "average2":
			fourthDivBorder = "border-4 [box-shadow:0_8px_0_0_rgb(200,200,200)]";
			break;
		case "worst2":
			fifthDivBorder = "border-4 [box-shadow:0_8px_0_0_rgb(200,200,200)]";
			break;
		default:
			break;
	}

	return (
		<div className="flex w-3/5
		 h-10 relative">
			<div className={`w-1/5 h-full rounded-s-xl bg-red-500 [box-shadow:0_8px_0_0_rgb(220,38,38)] ${firstDivBorder}`}></div>
			<div className={`w-1/5 h-full bg-yellow-500 [box-shadow:0_8px_0_0_rgb(202,138,4)] ${secondDivBorder}`}></div>
			<div className={`w-1/5 h-full bg-green-500 [box-shadow:0_8px_0_0_rgb(22,163,74)] ${thirdDivBorder}`}></div>
			<div className={`w-1/5 h-full bg-yellow-500 [box-shadow:0_8px_0_0_rgb(202,138,4)] ${fourthDivBorder}`}></div>
			<div className={`w-1/5 h-full rounded-e-xl bg-red-500 [box-shadow:0_8px_0_0_rgb(220,38,38)] ${fifthDivBorder}`}></div>
		</div>
	);
};

const Button = ({ onClick, isDisable }) => {
	return (
		<div className={`flex flex-col justify-center items-center button w-20 h-10 bg-gray-800 rounded-xl cursor-pointer select-none [box-shadow:0_8px_0_0_#000]
		active:translate-y-2  active:[box-shadow:0_0px_0_0_#000]
		transition-all duration-150
		border-red-400 ml-3 mb-2`}
			onClick={onClick}
		>
			<span className='block text-white font-bold text-lg'>{isDisable ? "WAIT" : "HIT"}</span>
		</div>
	);
};

const Game = () => {
	const [isGameStart, setIsGameStart] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [showWaitingTime, setShowWaitingTime] = useState(false);
	const [showGame, setShowGame] = useState(false);
	const [showGameCounter, setShowGameCounter] = useState("GET");
	const [team, setTeam] = useState("musk");
	const [teamMoto, setTeamMoto] = useState(teamMotoOption["musk"]);
	const [score, setScore] = useState(0);
	const [meterPosition, setMeterPosition] = useState(0);
	const [isMeterMoving, setIsMeterMoving] = useState(false);
	const [isDisableBtn, setIsDisableBtn] = useState(false);
	const [timer, setTimer] = useState(119);
	const [showTimer, setShowTimer] = useState("2 : 00");
	const [heart, setHeart] = useState(3);

	const handleHitClick = () => {
		setIsDisableBtn(true);
		calculateScore();
		playAnimationAndSound();
		setTimeout(() => {
			setIsDisableBtn(false);
		}, 1000);
	};

	const handleSetMusk = () => {
		setTeam("musk");
		setTeamMoto(teamMotoOption["musk"]);
	}

	const handleSetZuck = () => {
		setTeam("zuck");
		setTeamMoto(teamMotoOption["zuck"]);
	}

	const handleStartClick = () => {
		setShowWaitingTime(true);
		setShowGame(true);
		setTimeout(() => {
			set();
		}, 1000);
	}

	const set = () => {
		setShowGameCounter("SET");
		setTimeout(() => {
			ready();
		}, 1000);
	}

	const ready = () => {
		setShowGameCounter("READY");
		setTimeout(() => {
			go();
		}, 1000);
	}
	const go = () => {
		setShowGameCounter("GO");
		setTimeout(() => {
			setIsMeterMoving(true);
			setIsGameStart(true);
			setShowWaitingTime(false);
		}, 1000);
	}

	const handleRestartClick = () => {
		setIsGameStart(false);
		setIsGameOver(false);
		setScore(0);
		setTimer(120);
		setShowTimer("2 : 00");
		setShowGame(false);
		setShowGameCounter("GET");
		setIsMeterMoving(false);
		setMeterPosition(0);
		setHeart(3);
	}

	const handleShareWhatsapp = () => {
		window.open(`https://web.whatsapp.com/send?text=🐦👨🏻‍🚀🚀:${score}%0A%0ACheck out http://localhost:3000/ now!%0A%0AThis game is hilarious, and shows your support for Musk or Zuck!!`, "_blank");
	}

	const handleShareTwitter = () => {
		window.open(`https://twitter.com/intent/tweet?url=🐦👨🏻‍🚀🚀:${score}%0A%0Ahttps%3A%2F%2Flocalhost:3000%20%7C%20%40FlappyMusk`, "_blank");
	}

	const handleMeterMovement = useCallback(() => {
		if (isMeterMoving) {
			const keys = Object.keys(meterOption);
			const randomKey = keys[Math.floor(Math.random() * keys.length)];
			const meterPosition = meterOption[randomKey];

			setMeterPosition(meterPosition);
		}
	}, [isMeterMoving]);

	useEffect(() => {
		const handleTimerEnd = (remainingSeconds) => {
			if (remainingSeconds === 0) {
				setIsGameOver(true);
				setShowGame(false);
				clearInterval(timerInterval);
				clearInterval(meterUpdate);
			}
		}

		const meterUpdate = setInterval(() => {
			handleMeterMovement();
		}, 200);

		const timerInterval = setInterval(() => {
			if (isGameStart) {
				if (heart <= 0 || timer <= 0) {
					handleTimerEnd(0);
				} else {
					console.log(timer);
					setTimer(timer - 1)
					handleTimerEnd(timer - 1);
					var minutes = Math.floor(timer / 60);
					var seconds = timer % 60;

					if (seconds < 10) {
						seconds = "0" + seconds;
					}

					setShowTimer(minutes + " : " + seconds);
				}
			}
		}, 1000);

		return () => {
			clearInterval(timerInterval);
			clearInterval(meterUpdate);
		};
	}, [timer, handleMeterMovement, heart, isGameStart]);

	const [playbackRate, setPlaybackRate] = React.useState(0.75);

	const [play] = useSound('./assets/succss-1-6297.mp3', {
		playbackRate,
		volume: 0.5,
	});


	const calculateScore = () => {
		let hitQuality;

		if (meterPosition === "perfect") {
			hitQuality = 'perfect';
			setPlaybackRate(playbackRate + 0.1);
			play();
			setScore((prevScore) => prevScore + 100);
		} else if (meterPosition === 'average1' || meterPosition === 'average2') {
			hitQuality = 'average';
			setScore((prevScore) => prevScore + 50);
		} else {
			hitQuality = 'worst';
			setScore((prevScore) => prevScore);
			setTimer((prevTimer) => prevTimer - 10);
			setHeart(heart - 1);
		}

		console.log(`Hit Quality: ${hitQuality}`);
	};

	const playAnimationAndSound = () => {
		// Play the animation and sound effect for the hit
		// Implement your animation and sound effect logic here
	};

	return (
		<>
			<h1 className="text-center text-white text-3xl font-bold my-5">Billionaire Brawls</h1>
			<div id='mainbg' className="from-[#243748] bg-gradient-to-br to-[#4b749f] mx-auto w-[400px] h-[560px] rounded-3xl relative">
				<div className={` rounded-3xl h-full flex flex-col justify-center items-center ${isGameStart || showWaitingTime ? "hidden" : ""}`}>
					<h2 className={`w-[332px] py-3 mb-6 text-white text-lg font-bold rounded-xl text-center items-center ${team === "musk" ? "bg-red-500 [box-shadow:0_8px_0_0_rgb(220,38,38)]" : "bg-blue-500 [box-shadow:0_8px_0_0_rgb(29,78,216)]"}`}>Ahhhh, {teamMoto}. Good Choice</h2>
					<div className='flex justify-center'>
						<div className={`flex flex-col justify-center items-center button w-40 h-40 bg-red-500 rounded-xl cursor-pointer select-none [box-shadow:0_8px_0_0_rgb(220,38,38)]
    active:translate-y-2 active:[box-shadow:0_0px_0_0_rgb(220,38,38)]
    transition-all duration-150
    border-red-400 mr-3 mb-2 
  `}
							onClick={handleSetMusk}
						>
							<img src={muskImg} alt="" height={80} width={80} />
							<span className='block text-white font-bold text-lg'>MUSK</span>
						</div>
						<div className={`flex flex-col justify-center items-center button w-40 h-40 bg-blue-500 rounded-xl cursor-pointer select-none [box-shadow:0_8px_0_0_rgb(29,78,216)]
    active:translate-y-2 active:[box-shadow:0_0px_0_0_rgb(29,78,216)]
    transition-all duration-150 
    border-blue-400 mb-2 
  `}
							onClick={handleSetZuck}
						>
							<img src={zuckImg} alt="" height={80} width={80} />
							<span className='block text-white font-bold text-lg'>ZUCK</span>
						</div>
					</div>
					<div className='mx-auto mt-4 button w-[332px] h-16 bg-gray-800 rounded-xl cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_rgb(0,0,0)]
    transition-all duration-150 [box-shadow:0_8px_0_0_rgb(0,0,0)]
    border-gray-500 mb-2
  '
						onClick={handleStartClick}
					>
						<span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>START</span>
					</div>
				</div>

				<div className={`${!showGame || isGameOver ? "hidden" : ""}`}>
					<div className={`absolute w-full h-full left-0 right-0 top-0 bottom-0 rounded-2xl  bg-black text-white z-10 opacity-70 flex justify-center items-center ${showWaitingTime ? "" : "hidden"}`}>
						<p className='text-8xl font-black mb-8'>{showGameCounter}</p>
					</div>

					<div>
						<div className="flex justify-between items-center absolute left-0 right-0 top-4 px-6">
							<div>
								<div className={`flex flex-col justify-center items-center button w-24 h-10 bg-red-500 rounded-xl cursor-pointer select-none [box-shadow:0_8px_0_0_rgb(220,38,38)]
		border-red-400 ml-3 mb-2`}
								>
									<span className='block text-white font-bold text-lg'>{heart}
										<FontAwesomeIcon icon={solidHeart} size="lg" style={{ marginLeft: "18px" }} />
									</span>
								</div>
							</div>
							<div className='text-white'>
								<h2 className='text-center'>Team {team}</h2>
								<h2 className="text-center text-5xl font-bold mb-2">{score}</h2>
							</div>
							<div className={`flex flex-col justify-center items-center button w-24 h-10 bg-blue-500 rounded-xl cursor-pointer select-none [box-shadow:0_8px_0_0_rgb(29,78,216)]
		border-red-400 ml-3 mb-2`}
							>
								<span className='block text-white font-bold text-lg'>{showTimer}</span>
							</div>
						</div>

						<div className="flex justify-center items-center h-1/2">
						</div>

						<div className="flex justify-center absolute left-0 right-0 bottom-4">
							<div className='w-full flex justify-center'>
								<Meter position={meterPosition} />
								<Button onClick={handleHitClick} isDisable={isDisableBtn} />
							</div>
						</div>
					</div>
				</div>

				<div className={`w-full h-full flex flex-col justify-center items-center ${isGameOver ? "" : "hidden"}`}>
					<div>
						<div className='w-[332px] pt-16 pb-4 bg-violet-500 [box-shadow:0_8px_0_0_rgb(109,40,217)] text-white text-center font-bold rounded-xl relative'>
							<img src={team === "musk" ? muskImg : zuckImg} className='absolute top-[-50px] left-0 right-0 mx-auto' alt="" height={80} width={80} />
							<p className='text-3xl pb-2'>GAME OVER</p>
							<p className='text-xl'>Score</p>
							<p className='text-6xl'>{score}</p>
						</div>
						<div className='mx-auto button h-16 bg-gray-700 rounded-xl cursor-pointer select-none
    active:translate-y-2 active:[box-shadow:0_0px_0_0_#000]
    transition-all duration-150 [box-shadow:0_8px_0_0_#000]
    border-gray-500 my-5
  '
							onClick={handleRestartClick}
						>
							<span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>PLAY AGAIN</span>
						</div>
						<div className='flex'>
							<div className='mx-auto button w-40 h-16 bg-green-500 rounded-xl cursor-pointer select-none
    active:translate-y-2 active:[box-shadow:0_0px_0_0_rgb(21,128,61)]
    transition-all duration-150 [box-shadow:0_8px_0_0_rgb(21,128,61)]
    border-gray-500 mb-2
  '
								onClick={handleShareWhatsapp}
							>
								<span className='flex justify-center items-center h-full text-white font-bold text-lg '>
									SHARE <FontAwesomeIcon icon={solidWhatsapp} size="lg" style={{ marginLeft: "12px" }} />
								</span>
							</div>
							<div className='mx-auto button w-40 h-16 bg-blue-500 rounded-xl cursor-pointer select-none
    active:translate-y-2 active:[box-shadow:0_0px_0_0_rgb(29,78,216)]
    transition-all duration-150 [box-shadow:0_8px_0_0_rgb(29,78,216)]
    border-gray-500 mb-2
  '
								onClick={handleShareTwitter}
							>
								<span className='flex justify-center items-center h-full text-white font-bold text-lg '>
									SHARE <FontAwesomeIcon icon={solidTwitter} size="lg" style={{ marginLeft: "12px" }} />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Game;