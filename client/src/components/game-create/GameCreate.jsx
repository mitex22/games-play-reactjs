import { useState } from "react";
import * as gamesAPI from "../../api/games-api";
import { useNavigate } from "react-router-dom";

const GameCreate = () => {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const titleInputHandler = (e) => {
        setTitle(e.target.value);
    }

    const [category, setCategory] = useState('');
    const categoryInputHandler = (e) => {
        setCategory(e.target.value);
    }

    const [maxLevel, setMaxLevel] = useState('');
    const maxLevelInputHandler = (e) => {
        setMaxLevel(e.target.value);
    }

    const [imageUrl, setImageUrl] = useState('');
    const imageUrlInputHandler = (e) => {
        setImageUrl(e.target.value);
    }

    const [summary, setSummary] = useState('');
    const summaryInputHandler = (e) => {
        setSummary(e.target.value);
    }

    const submitFormClickHandler = async (e) => {
        e.preventDefault();

        const gameData = {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        }

        try {
            await gamesAPI.gameCreate(gameData);

            navigate('/games');
        } catch (error) {
            console.log(error)
        }

    }

    return (
        // <!-- Create Page ( Only for logged-in users ) -->
        <section id="create-page" className="auth">
            <form id="create" onSubmit={submitFormClickHandler}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Enter game title..." 
                        onChange={titleInputHandler}
                        value={title}
                    />

                    <label htmlFor="category">Category:</label>
                    <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        placeholder="Enter game category..." 
                        onChange={categoryInputHandler}
                        value={category}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input 
                        type="number" 
                        id="maxLevel" 
                        name="maxLevel" 
                        min="1" 
                        placeholder="1" 
                        onChange={maxLevelInputHandler}
                        value={maxLevel}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input 
                        type="text" 
                        id="imageUrl" 
                        name="imageUrl" 
                        placeholder="Upload a photo..." 
                        onChange={imageUrlInputHandler}
                        value={imageUrl}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea 
                        name="summary" 
                        id="summary"
                        onChange={summaryInputHandler}
                        value={summary}
                    >
                    </textarea>
                    
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    )
}

export default GameCreate;