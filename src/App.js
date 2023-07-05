import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter as solidTwitter } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp as solidWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import muskImg from './assets/img/musk.png';
import zuckImg from './assets/img/zuck.png';
import musk from './assets//img/1.png';
import zuck from './assets//img/2.png';
import muskBang from './assets/img/3.png';
import zuckBang from './assets/img/4.png';
import muskBoom from './assets/img/5.png';
import zuckBoom from './assets/img/6.png';
import mouseClick from './assets/sound/click.wav';
import startSound from './assets/sound/start.wav';
import perfectHit from './assets/sound/hit1.wav';
import averageHit from './assets/sound/hit2.wav';
import worstHit from './assets/sound/hit3.wav';

const meterOption = Object.freeze({
	1: 'worst1',
	2: 'average1',
	3: 'perfect',
	4: 'average2',
	5: 'worst2',
})

const teamMotoOption = Object.freeze({
	'none': "Choose Your Team",
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

const Game = () => {
	const [isGameStart, setIsGameStart] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [showWaitingTime, setShowWaitingTime] = useState(false);
	const [showGame, setShowGame] = useState(false);
	const [showGameCounter, setShowGameCounter] = useState("GET");
	const [team, setTeam] = useState("musk");
	const [teamMoto, setTeamMoto] = useState(teamMotoOption['none']);
	const [teamCSS, setTeamCSS] = useState("bg-gray-800 [box-shadow:0_8px_0_0_rgb(0,0,0)]");
	const [score, setScore] = useState(0);
	const [meterPosition, setMeterPosition] = useState(0);
	const [isMeterMoving, setIsMeterMoving] = useState(false);
	const [isDisableBtn, setIsDisableBtn] = useState(false);
	const [timer, setTimer] = useState(119);
	const [showTimer, setShowTimer] = useState("2 : 00");
	const [heart, setHeart] = useState(3);
	const [mainCharcter, setMainCharcter] = useState();

	const handleHitClick = () => {
		setIsDisableBtn(true);
		calculateScore();
		setTimeout(() => {
			setIsDisableBtn(false);
		}, 500);
	};

	const handleSetMusk = () => {
		new Audio(mouseClick).play();
		setTeam("musk");
		setTeamMoto(teamMotoOption["musk"]);
		setMainCharcter(zuck);
		setTeamCSS("bg-red-500 [box-shadow:0_8px_0_0_rgb(185,28,28)]");
	}

	const handleSetZuck = () => {
		new Audio(mouseClick).play();
		setTeam("zuck");
		setTeamMoto(teamMotoOption["zuck"]);
		setMainCharcter(musk);
		setTeamCSS("bg-blue-500 [box-shadow:0_8px_0_0_rgb(29,78,216)]");
	}

	const handleStartClick = () => {
		new Audio(mouseClick).play();
		if (teamMoto === teamMotoOption['none']) {
			toast.error('Please choose one team!', {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} else {
			new Audio(startSound).play();
			setShowWaitingTime(true);
			setShowGame(true);
			setTimeout(() => {
				set();
			}, 1000);
		}
	}

	const nothing = () => {
		console.log("Go Slow Baby!!!");
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
		new Audio(mouseClick).play();
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
		new Audio(mouseClick).play();
		window.open(`https://web.whatsapp.com/send?text=🐦👨🏻‍🚀🚀:${score}%0A%0ACheck out http://localhost:3000/ now!%0A%0AThis game is hilarious, and shows your support for Musk or Zuck!!`, "_blank");
	}

	const handleShareTwitter = () => {
		new Audio(mouseClick).play();
		window.open(`https://twitter.com/intent/tweet?url=🐦👨🏻‍🚀🚀:${score}%0A%0Ahttps%3A%2F%2Flocalhost:3000`, "_blank");
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
					console.log(`Time: ${timer}`);
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

	const calculateScore = () => {
		let hitQuality;
		if (meterPosition === "perfect") {
			hitQuality = 'perfect';

			new Audio(perfectHit).play();

			if (team === "musk") {
				setMainCharcter(zuckBoom);
			} else {
				setMainCharcter(muskBoom)
			}
			setTimeout(() => {
				if (team === "musk") {
					setMainCharcter(zuck);
				} else {
					setMainCharcter(musk)
				}
			}, 500)

			setScore((prevScore) => prevScore + 100);
		} else if (meterPosition === 'average1' || meterPosition === 'average2') {
			hitQuality = 'average';

			new Audio(averageHit).play();

			if (team === "musk") {
				setMainCharcter(zuckBang);
			} else {
				setMainCharcter(muskBang)
			}
			setTimeout(() => {
				if (team === "musk") {
					setMainCharcter(zuck);
				} else {
					setMainCharcter(musk)
				}
			}, 500)

			setScore((prevScore) => prevScore + 50);
		} else {
			hitQuality = 'worst';
			new Audio(worstHit).play();
			setScore((prevScore) => prevScore);
			setTimer((prevTimer) => prevTimer - 10);
			setHeart(heart - 1);
		}

		console.log(`Hit Quality: ${hitQuality}`);
	};

	return (
		<>
			<h1 className="text-center text-white text-3xl font-bold my-5">Billionaire Brawls</h1>
			<div id='mainbg' className="from-[#243748] bg-gradient-to-t to-[#4b749f] mx-auto w-[400px] h-[560px] rounded-3xl relative">
				<div className={` rounded-3xl h-full flex flex-col justify-center items-center ${isGameStart || showWaitingTime ? "hidden" : ""}`}>
					<h2 className={`w-[332px] py-3 mb-6 text-white text-lg font-bold rounded-xl text-center items-center 
					${teamCSS}`
					}>{teamMoto}</h2>
					<div className='flex justify-center'>
						<div className={`flex flex-col justify-center items-center button w-40 h-40 bg-red-500 rounded-xl cursor-pointer select-none [box-shadow:0_8px_0_0_rgb(185,28,28)]
    active:translate-y-2 active:[box-shadow:0_0px_0_0_rgb(185,28,28)]
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

						<div className="flex justify-center items-center absolute bottom-0 left-0 right-0">
							<img src={mainCharcter} alt="" width={250} />
						</div>

						<div className="flex justify-center absolute left-0 right-0 bottom-4">
							<div className='w-full flex justify-center'>
								<Meter position={meterPosition} />
								<div className={`flex flex-col justify-center items-center button w-20 h-10 bg-gray-800 rounded-xl cursor-pointer select-none [box-shadow:0_8px_0_0_#000]
		active:translate-y-2  active:[box-shadow:0_0px_0_0_#000]
		transition-all duration-500
		border-red-400 ml-3 mb-2`}
									onClick={isDisableBtn ? nothing : handleHitClick}
								>
									<span className='block text-white font-bold text-lg'>HIT</span>
								</div>
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
			<ToastContainer />
		</>
	);
};

export default Game;