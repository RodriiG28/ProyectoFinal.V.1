import { Container, IconButton , useColorMode, Tooltip} from '@chakra-ui/react';
import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';


const Header=()=>{

     // Declaración hook para modo diurno/nocturno
    const {colorMode, toggleColorMode} = useColorMode()

    return(				
        <Container as='header' h={{base:'8vh',md:'10vh'}} maxW="100vw" display="flex" flexDirection="row" justifyContent={'flex-start'}
            bg={'rgb(61, 109, 184)'} alignItems={'center'} >
                <Container  display="flex"  flexDirection="row" alignItems={'center'} justifyContent={'space-around'} gap={{base:'2',sm:'4',md:'4',lg:'6'}} >
                    
                    <Tooltip label={(colorMode === 'light' ?  'Modo Nocturo' :  'Modo Diurno')}>
                        <IconButton cursor="pointer" py={2} mr={'5'} color={'whitesmoke'} bg={'transparent'} _hover={{bg:'transparent'}} onClick={toggleColorMode} as={(colorMode === 'light' ?  MoonIcon :  SunIcon)} /></Tooltip>
                </Container>
                 
        </Container>
    );   

}

export {Header};