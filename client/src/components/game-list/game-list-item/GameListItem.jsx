import {Link} from 'react-router-dom'
import { pathToUrl } from '../../../utils/pathUtils'
import PATH from '../../../paths/paths'

const GameListItem = (
    {
        _id: gameId,
        title,
        category,
        maxLevel,
        imageUrl,
        summary
    }
) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={imageUrl} />
                <h6>{category}</h6>
                <h2>{title}</h2>
                <Link to={pathToUrl(PATH.GAME_DETAILS, { gameId })} className="details-button">Details</Link>
            </div>

        </div>
    )
}

export default GameListItem