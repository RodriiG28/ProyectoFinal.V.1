import React, { useState } from 'react';
import { VStack, Input, InputGroup, InputRightElement, Circle, Text, Button } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { FaPlus } from 'react-icons/fa';

function TaskForm({ agregarTarea }) {
  // Estado para manejar el contenido del input
  const [contenido, setContenido] = useState('');
  // Estado para manejar el mensaje de error
  const [error, setError] = useState('');

  // Manejar la presentación del formulario
  function handleSubmit(e) {
    e.preventDefault();
    // Validar que el contenido no esté vacío
    if (contenido.trim() === '') {
      setError('Error, debe ingresar una tarea.');
      return;
    }

    // Crear un nuevo objeto de tarea con un ID único generado por nanoid
    const todo = {
      id: nanoid(), // Utiliza nanoid para generar un ID único
      title: contenido,
      completed: false,
    };

    // Llamar a la función proporcionada para agregar la tarea
    agregarTarea(todo);

    // Limpiar el contenido y el mensaje de error después de agregar la tarea
    setContenido('');
    setError('');
  }

  // Manejar la tecla "Enter" para enviar el formulario
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  // Renderizar el componente
  return (
    <VStack alignItems="center" spacing={4} mb={4} mt={4}>
      {/* Grupo de input con ícono de círculo y botón de agregar */}
      <InputGroup>
        <Input
          variant="filled"
          borderRadius="20px"
          textAlign={'left'}
          fontSize={'10px'}
          fontFamily={'Red Hat Display'}
          placeholder="Escriba algo"
          overflowWrap="break-word"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          color="gray.500"
          _placeholder={{ color: 'gray.300' }}
          _focus={{ bg: 'gray.200', border: 'none' }}
          _hover={{ bg: 'gray.200', border: 'none' }}
          border="none"
          onKeyDown={handleKeyDown} // Manejar la tecla "Enter"
        />
        <InputRightElement>
          {/* Botón de círculo con ícono + para agregar la tarea */}
          <Circle
            // size={{base:'12px',md:'16px'}}
            size="16px"
            bg="rgb(255,31,91)"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={handleSubmit}
          >
            
            <FaPlus size="10px"/>
          </Circle>
        </InputRightElement>
      </InputGroup>
      {/* Mostrar mensaje de error si existe */}
      {error && <Text fontFamily="Red Hat Display" fontSize={{base:'8',md:'10'}} color="rgb(255,31,91)">{error}</Text>}
    </VStack>
  );
}

export default TaskForm;
