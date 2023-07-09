import React, { useState } from 'react';
import Header from './component/Header';
import Game from './component/Game'
import GameGuide from './component/GameGuide'
import EmailList from './component/EmailList';
import Footer from './component/Footer';
import { ToastContainer, toast } from 'react-toastify';

function Main() {
	const [team, setTeam] = useState();

	return (
		<div>
			<Header team={team}/>
			<Game team={team} setTeamFunc={setTeam}/>
			<GameGuide />
			<EmailList team={team} toast={toast} />
			<Footer team={team} />
		</div>
	)
};

export default Main;