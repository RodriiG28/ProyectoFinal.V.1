import React, { useState } from 'react';
import { VStack, Input, InputGroup, InputRightElement, Circle, Text, Button } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

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
      setError('Por favor, ingresa algo antes de agregar una tarea.');
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
    <VStack alignItems="center" spacing={4} mb={4}>
      {/* Grupo de input con ícono de círculo y botón de agregar */}
      <InputGroup>
        <Input
          variant="filled"
          borderRadius="20px"
          placeholder="Agregar tarea..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          color="gray.700"
          bg="gray.200"
          _placeholder={{ color: 'gray.500' }}
          _focus={{ bg: 'gray.200', border: 'none' }}
          _hover={{ bg: 'gray.200', border: 'none' }}
          border="none"
          onKeyDown={handleKeyDown} // Manejar la tecla "Enter"
        />
        <InputRightElement>
          {/* Botón de círculo con el símbolo "+" para agregar la tarea */}
          <Circle
            size="30px"
            bg="red.500"
            color="white"
            fontSize="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={handleSubmit}
          >
            +
          </Circle>
        </InputRightElement>
      </InputGroup>
      {/* Mostrar mensaje de error si existe */}
      {error && <Text color="red.500">{error}</Text>}
    </VStack>
  );
}

export default TaskForm;
