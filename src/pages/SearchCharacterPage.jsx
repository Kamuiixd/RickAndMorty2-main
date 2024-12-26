import React from 'react'
import CharacterInputBox from '../components/CharacterSearchModule/CharacterInputBox'
import CharacterPagination from '../components/CharacterSearchModule/CharacterPagination'
import CharacterCardList from '../components/CharacterSearchModule/CharacterCardList'
import { CharacterProvider } from '../components/CharacterSearchModule/CharacterContext'
import { Container, Box } from '@mui/material'

function SearchCharacterPage() {

  return (
    <Container>
        <CharacterProvider>
            <Box>
                <CharacterPagination />
            </Box>
            <Box>
                <CharacterInputBox />
            </Box>
            <Box>
                <CharacterCardList />
            </Box>
        </CharacterProvider>
    </Container>
  )
}

export default SearchCharacterPage