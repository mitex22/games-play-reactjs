import { useContext } from 'react';
import { useGetPortfolioGames } from '../../../hooks/useGames';
import AuthContext from '../../../contexts/authContext';
import GamePortfolioListItem from './game-portfolio-list-item/GamePortfolioListItem';
import * as gamesAPI from "../../../api/games-api";

const GamePortfolio = () => {

    const { username } = useContext(AuthContext);

    const [transactions, setTransactions] = useGetPortfolioGames(username);

    const deleteTransactionItem = async (transactionId) => {
        await gamesAPI.gameSell(transactionId);

        setTransactions((currTransactions) => [...currTransactions].filter((transaction) => transaction._id !== transactionId));
    }

    return (
        // < !--Catalogue -- >
        <section id="catalog-page">
            <h1>My Portfolio</h1>

            {transactions.length > 0
                ? transactions.map((transactionItem) => (
                    <GamePortfolioListItem
                        key={transactionItem._id}
                        {...transactionItem}
                        deleteTransactionItem={deleteTransactionItem}
                    />
                ))
                : <h3 className="no-articles">No games yet</h3>
            }
        </section>
    )
}

export default GamePortfolio;