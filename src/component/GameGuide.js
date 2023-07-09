import React from 'react';

export default function GameGuide() {

    return (
        <section className="max-w-7xl w-full md:w-9/12 text-white mx-auto">
            <ul className="m-8 md:mx-0 ">
                <li className="mb-4">
                    <strong className="text-lg">Team Selection:</strong>
                    <p>Choose your preferred team: Team Musk or Team Zuck. This choice will determine which leaderboard your final score will be added to.</p>
                </li>
                <li className="mb-4">
                    <strong className="text-lg">Game Start:</strong>
                    <p>Once you've made your team selection, the game will begin.</p>
                    <p>You'll see a meter with an indicator that randomly moves between three zones: worst, average, and perfect.</p>
                </li>
                <li className="mb-4">
                    <strong className="text-lg">Scoring:</strong>
                    <p>Your objective is to click the "Hit" button at the right moment to score points.</p>
                    <p>When you successfully hit the indicator, the points awarded depend on its position:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Perfect Zone: Score <strong>100 points!</strong></li>
                        <li>Average Zone: Score <strong>50 points.</strong></li>
                        <li>Worst Zone: Unfortunately, <strong>no points</strong> are awarded, and <strong>10 seconds</strong> will be deducted from your remaining time.</li>
                    </ol>
                    <p>Be quick and precise with your hits to maximize your score!</p>
                </li>
                <li className="mb-4">
                    <strong className="text-lg">Lifespan:</strong>
                    <p>You start the game with <strong>three lives</strong>.</p>
                    <p>Each time you hit the worst zone, you'll lose one life.</p>
                    <p>Losing all three lives will result in the end of the game.</p>
                </li>
                <li className="mb-4">
                    <strong className="text-lg">Time Limit:</strong>
                    <p>You have <strong>120 seconds</strong> to score as many points as possible.</p>
                    <p>The game will end when either 120 seconds have elapsed or you run out of lives.</p>
                </li>
                <li className="mb-4">
                    <strong className="text-lg">Leaderboard:</strong>
                    <p>At the end of the game, your score will be added to your chosen team: Team Musk or Team Zuck.</p>
                </li>
                <li>
                    <strong className="text-lg">Play Again:</strong>
                    <p>Feel free to play again and try to improve your score.</p>
                    <p>Don't forget to share this with your friends, including Musk and Zuck if possible!</p>
                </li>
            </ul>
        </section>
    )
}