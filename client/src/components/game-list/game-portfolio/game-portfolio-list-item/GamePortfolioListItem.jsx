import { Link } from 'react-router-dom'
import { pathToUrl } from '../../../../utils/pathUtils'
import PATH from '../../../../paths/paths'
import { useContext } from 'react'
import AuthContext from '../../../../contexts/authContext'

const GamePortfolioListItem = ({
    game,
    _id: transactionId,
    _ownerId,
    deleteTransactionItem
}) => {

    const { userId, isAuthenticated } = useContext(AuthContext);

    const gameId = game._id;

    const isGameOwner = userId === _ownerId;

    const sellGameButtonClickHandler = async (transactionId) => {
        const hasConfirmed = confirm(`Are you sure you want to sell ${game.title}?`);

        if (hasConfirmed) {
            deleteTransactionItem(transactionId);
        }
    }

    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={game.imageUrl} />
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>
                <Link to={pathToUrl(PATH.GAME_DETAILS, { gameId })} className="details-button">Details</Link>
            </div>

            {isAuthenticated && isGameOwner && <button className="button" onClick={() => sellGameButtonClickHandler(transactionId)}>Sell Game</button>}

        </div>
    )
}

export default GamePortfolioListItem;