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

function TaskItem({ todo, handleTaskAction }) {
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
            w="90%" // Ajuste en el ancho del Flex
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
            <IconButton
                icon={<FaTrash />}
                variant="ghost"
                color="red.500"
                onClick={() => handleTaskAction(todo.id, 'delete')}
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
                    textAlign="center"
                />
            ) : (
                // Modo de visualización
                <Text
                    textDecoration={todo.completed ? 'line-through' : 'none'}
                    cursor="pointer"
                    color={todo.completed ? 'gray.500' : 'gray.700'}
                    fontFamily="Inter"
                    fontWeight="medium"
                    fontSize="lg"
                    flex="1"
                    overflowWrap="break-word"
                    onClick={() => handleTaskAction(todo.id, 'toggle')}
                    textAlign="center"
                >
                    {truncatedTitle}
                    {/* Mostrar la fecha */}
                    <Text fontSize="sm" color="gray.500">
                        {todo.fecha}
                    </Text>
                </Text>
            )}
            {isHovered && (
                // Botón de editar visible solo en el modo de visualización
                <IconButton
                    icon={<FaEdit />}
                    variant="ghost"
                    color="red.500"
                    fontSize="lg"
                    onClick={editedTitle.length > 28 ? handleDetailViewClick : handleEditClick}
                />
            )}
            <Circle
                size="24px"
                bg={todo.completed ? 'red.500' : 'gray.300'}
                color={todo.completed ? 'white' : 'red.500'}
                fontSize="sm"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={handleCheckClick}
                cursor="pointer"
            >
                <FaCheck />
            </Circle>
            {isDetailView && (
                // Modal de detalle
                <Modal
                    isOpen={isDetailView}
                    onClose={handleCloseModal}
                    size="md"
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
                        >
                            Detalle de Tarea
                            {/* Mostrar la fecha en el encabezado del modal */}
                            <Text color="gray.500" fontFamily="Inter" fontWeight="medium" fontSize="lg" flex="1" ml="8">
                                {todo.fecha}
                            </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                            pb={0}
                            pt={0}
                            px={0}
                            w="100%"
                            display="flex"
                            alignItems="center"
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
                                _focus={{ bg: 'gray.200', border: 'none' }}
                                _hover={{ bg: 'gray.200', border: 'none' }}
                                fontSize="lg"
                                border="none"
                                size="sm"
                            />
                        </ModalBody>
                        <ModalFooter>
                            {/* Botón de guardar en el modal */}
                            <Button colorScheme="green" onClick={handleSaveClick}>
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
