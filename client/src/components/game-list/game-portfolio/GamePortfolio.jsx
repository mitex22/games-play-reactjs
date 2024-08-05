import { useContext } from 'react';
import { useGetPortfolioGames } from '../../../hooks/useGames';
import GameListItem from '../game-list-item/GameListItem';
import AuthContext from '../../../contexts/authContext';

const GamePortfolio = () => {

    const { username } = useContext(AuthContext);

    const [transactions] = useGetPortfolioGames(username);

    return (
        // < !--Catalogue -- >
        <section id="catalog-page">
            <h1>My Portfolio</h1>

            {transactions.length > 0
                ? transactions.map((transactionItem) => (
                    <GameListItem
                        key={transactionItem._id}
                        {...transactionItem.game}
                    />
                ))
                : <h3 className="no-articles">No games yet</h3>
            }
        </section>
    )
}

export default GamePortfolio