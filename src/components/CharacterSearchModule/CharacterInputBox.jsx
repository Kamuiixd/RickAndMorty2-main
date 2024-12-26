import React, {useContext, useRef} from 'react'
import { CharacterContext } from './CharacterContext';

function CharacterInputBox() {
    const { setSearchName, setPage } = useContext(CharacterContext);
    const searchInput = useRef();

    
    //HANDLE DE BUSQUEDA DE PERSONAJES  
    const handleSearch = () => {
        const name = searchInput.current.value
        setSearchName(name)
        setPage(1); 
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <div>
            <input
                type="text"
                placeholder="Buscar Personaje"
                ref={searchInput}
                onKeyDown={handleKeyDown}
            />

            <button onClick={handleSearch}>
                Buscar
            </button>



        </div>
    )
}

export default CharacterInputBox