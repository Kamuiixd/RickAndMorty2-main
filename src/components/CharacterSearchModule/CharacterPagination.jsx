import React , {useContext} from 'react'
import { CharacterContext } from './CharacterContext'

function CharacterPagination() {
    const { page, totalPages, setPage } = useContext(CharacterContext);

    
    //HANDLE para paginacion de personajes
  const handleNextPress = (event) => {
    if (page < totalPages) setPage(page + 1);
    console.log('Next', page);
  };

  const handlePrevPress = (event) => {
    if (page > 1) setPage(page - 1);
    console.log('Prev', page);
  };
    
    return (
        <div>
            <span>{page} de {totalPages}</span>
            <button onClick={handlePrevPress} disabled={page === 1}>Anterior</button>
            <button onClick={handleNextPress} disabled={page === totalPages}>Siguiente</button>

        </div>
    )
}

export default CharacterPagination