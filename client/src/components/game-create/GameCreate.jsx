import * as gamesAPI from "../../api/games-api";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

const CREATE_GAME_FORM_KEYS = {
    TITLE: 'title',
    CATEGORY: 'category',
    MAX_LEVEL: 'maxLevel',
    IMAGE_URL: 'imageUrl',
    SUMMARY: 'summary',
}

const GameCreate = () => {
    const navigate = useNavigate();
    
    const submitFormHandler = async (values) => {

        // TODO: Create Game Form validation
        // if (values[CREATE_GAME_FORM_KEYS.TITLE] === '') {
        //     return console.log(values[CREATE_GAME_FORM_KEYS.TITLE], 'missing bro');
        // }

        try {
            await gamesAPI.gameCreate(values);

            navigate('/games');
        } catch (error) {
            console.log(error)
        }
    }

    const { values, onChange, onSubmit } = useForm(submitFormHandler, {
        [CREATE_GAME_FORM_KEYS.TITLE]: '',
        [CREATE_GAME_FORM_KEYS.CATEGORY]: '',
        [CREATE_GAME_FORM_KEYS.MAX_LEVEL]: '',
        [CREATE_GAME_FORM_KEYS.IMAGE_URL]: '',
        [CREATE_GAME_FORM_KEYS.SUMMARY]: '',
    });

    return (
        // <!-- Create Page ( Only for logged-in users ) -->
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        placeholder="Enter game title..." 
                        onChange={onChange}
                        value={values[CREATE_GAME_FORM_KEYS.TITLE]}
                    />

                    <label htmlFor="category">Category:</label>
                    <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        placeholder="Enter game category..." 
                        onChange={onChange}
                        value={values[CREATE_GAME_FORM_KEYS.CATEGORY]}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input 
                        type="number" 
                        id="maxLevel" 
                        name="maxLevel" 
                        min="1" 
                        placeholder="1" 
                        onChange={onChange}
                        value={values[CREATE_GAME_FORM_KEYS.MAX_LEVEL]}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input 
                        type="text" 
                        id="imageUrl" 
                        name="imageUrl" 
                        placeholder="Upload a photo..." 
                        onChange={onChange}
                        value={values[CREATE_GAME_FORM_KEYS.IMAGE_URL]}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea 
                        name="summary" 
                        id="summary"
                        onChange={onChange}
                        value={values[CREATE_GAME_FORM_KEYS.SUMMARY]}
                    >
                    </textarea>
                    
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    )
}

export default GameCreate;