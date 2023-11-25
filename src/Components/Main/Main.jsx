import React from 'react';
import App from '../../App';
import { Container } from '@chakra-ui/react';
import './Main.css'


const Main=()=>{

    return(				
        <Container minH={{base:'90vh',md:'86vh'}} maxW="100vw" display={'flex'} 
        flexDirection={'column'} alignItems={'center'} justifyContent={'center'} bg={'rgb(228, 228, 228)'} > 		
            <Container className='Diagonal' display={'flex'} alignContent={'center'} justifyContent={'center'}>
                <App/></Container>
        </Container>
    );          

}

export {Main};