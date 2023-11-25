import React, { useState } from 'react';

import {
    Flex,
    Text,
    Circle,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Textarea,
    Button,
} from '@chakra-ui/react';
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa';

function TaskItem({ todo, handleTaskAction, ts }) {
    // Estado para manejar la edición del título
    const [isEditing, setEditing] = useState(false);
    // Estado para almacenar el título editado
    const [editedTitle, setEditedTitle] = useState(todo.title);
    // Estado para manejar el hover del componente
    const [isHovered, setHovered] = useState(false);
    // Estado para manejar la apertura del modal de detalle
    const [isDetailView, setDetailView] = useState(false);

    // Crear un título truncado para mostrar en la sección principal
    const truncatedTitle = editedTitle.length > 28 ? `${editedTitle.slice(0, 28)}...` : editedTitle;

    // Manejar clic en el botón de editar
    const handleEditClick = () => {
        setEditing(true);
        if (editedTitle.length > 28) {
            setDetailView(true);
        }
    };

    // Manejar clic en el botón de guardar (en modo de edición)
    const handleSaveClick = () => {
        handleTaskAction(todo.id, 'edit', editedTitle);
        setEditing(false);
        setDetailView(false);
    };

    // Manejar clic en la tarea para abrir el modal o editar en la sección principal
    const handleDetailViewClick = () => {
        if (editedTitle.length > 28) {
            setDetailView(true);
        } else {
            setEditing(true);
        }
    };

    // Manejar clic en el botón de completar tarea
    const handleCheckClick = () => {
        if (isEditing) {
            handleSaveClick();
        } else {
            handleTaskAction(todo.id, 'toggle');
        }
    };

    // Manejar la pulsación de la tecla Enter para guardar cambios
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveClick();
        }
    };

    // Manejar clic en el texto para evitar tachar la fecha
    const handleTextClick = (e) => {
        e.stopPropagation();
        handleTaskAction(todo.id, 'toggle');
    };

    // Manejar clic para cerrar el modal
    const handleCloseModal = () => {
        setDetailView(false);
        setEditing(false);
    };

    // Renderizar el componente
    return (
        <Flex
            key={todo.id}
            w="96%" // Ajuste en el ancho del Flex
            justify="space-between"
            align="center"
            _hover={{
                bg: 'gray.100',
                borderRadius: 'md',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Botón para eliminar la tarea */}
            {isHovered && (
                // Botón de editar visible solo en el modo de visualización
                <IconButton
                    icon={<FaEdit size="12px"/>}
                    variant="ghost"
                    color="rgb(255,31,91)"
                    
                    onClick={editedTitle.length > 20 ? handleDetailViewClick : handleEditClick}
                />
            )}

            <IconButton
                icon={<FaTrash />}
                variant="ghost"
                // color="rgba(255,31,91,0.7)"
                color={todo.completed?"rgba(255,31,91,0.85)":"rgba(255,31,91,0.35)"}
                onClick={() => handleTaskAction(todo.id, 'delete')}
                fontSize={{base:'10',md:'12',lg:'14'}}
            />
              
            {isEditing ? ( // Modo de edición
                <Textarea
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    color="gray.700"
                    bg="gray.200"
                    _placeholder={{ color: 'gray.500' }}
                    _focus={{ bg: 'gray.200', border: 'none' }}
                    _hover={{ bg: 'gray.200', border: 'none' }}
                    border="none"
                    onKeyDown={handleKeyDown}
                    size="sm"
                    textAlign="left"
                />
            ) : (
                // Modo de visualización
                
                <Text 
                    textDecoration={todo.completed ? 'line-through' : 'none'}
                    textDecorationColor={todo.completed ? 'rgb(255,31,91)' : 'none'}
                    
                    cursor="pointer"
                    color={todo.completed ? 'gray.300' : 'gray.600'}
                    fontFamily="Red Hat Display"
                    fontWeight="700"
                    fontSize={{base:'12',md:'13',lg:'14'}}
                    flex="1"
                    minW={{base:'100',sm:'110',md:'120',lg:'130'}}
                    maxW={{base:'130',sm:'130',md:'150',lg:'160'}}
                    overflowWrap="break-word"
                    onClick={() => handleTaskAction(todo.id, 'toggle')}
                    textAlign="left"
                >
                    {truncatedTitle}
                    {/* Mostrar la fecha */}
                    <Text fontSize={{base:'6',md:'7',lg:'8'}} color="rgba(255,31,91,0.8)">
                        {/* {todo.fecha} */}
                        {ts}
                    </Text>
                </Text>
            )}
                    {/* -------------- aca estuvo bt edit -- */}
            <Circle
                // size={{base:'14px',md:'18px'}}
                size="18px"
                bg={todo.completed ? 'rgb(255,31,91)' : 'gray.200'}
                color={todo.completed ? 'white' : 'rgb(255,31,91)'}
                fontSize="sm"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={handleCheckClick}
                cursor="pointer"
            >
                {/* <FaCheck size={{base:'4px',md:'8px'}}/> */}
                <FaCheck size="10px"/>
            </Circle>
            {isDetailView && (
                // Modal de detalle
                <Modal
                    isOpen={isDetailView}
                    onClose={handleCloseModal}
                    size="md"
                    // W="90vw"
                    centerContent
                    isCentered
                    scrollBehavior="inside"
                    motionPreset="scale"
                    preserveScrollBarGap
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader
                            display="flex"
                            justifyContent="space-between"
                            bg="gray.50"
                            borderRadius="md"
                            w="100%"
                            fontFamily="Red Hat Display"
                            color="rgb(255,31,91)"
                        >
                            Edit 
                           
                        </ModalHeader>
                        <ModalCloseButton color="rgb(255,31,91)"/>
                        <ModalBody
                            pb={0}
                            pt={0}
                            px={0}
                            w="100%"
                            display="flex"
                            alignContent="center"
                            justifyContent="center"
                            flexDirection="column"
                            bg="gray.50"
                        >
                            {/* Textarea para editar el título en el modal */}
                            <Textarea
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                color="gray.700"
                                bg="gray.200"
                                _placeholder={{ color: 'gray.500' }}
                                _focus={{ bg: 'gray.100', border: 'none' }}
                                _hover={{ bg: 'gray.100', border: 'none' }}
                                fontSize="lg"
                                
                                textAlign={'left'}
                                border="none"
                                size="sm"
                            />
                        </ModalBody>
                        <ModalFooter>
                             {/* Mostrar la fecha en el footer del modal */}
                             <Text color="gray.400" fontFamily="Red Hat Display" fontWeight="medium" fontSize={{base:'10',md:'12',lg:'14'}} flex="1" ml="8" alignSelf={'left'}>
                                {/* {todo.fecha} */}
                                {ts}
                            </Text>
                            {/* Botón de guardar en el modal */}
                            <Button bg="rgb(255,31,91)" color={'whitesmoke'} fontFamily="Red Hat Display" _hover={{ bg: 'rgba(255,31,91,0.6)', border: 'none' }} onClick={handleSaveClick}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Flex>
    );
}

export default TaskItem;
