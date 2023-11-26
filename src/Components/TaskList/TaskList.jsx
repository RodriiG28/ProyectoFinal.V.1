import React from 'react';
import { VStack, Text, StackDivider, Badge, HStack, Container, Grid, GridItem, Box } from '@chakra-ui/react';
import TaskItem from '../TaskItem/TaskItem';
import TaskForm from '../TaskForm/TaskForm';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { GrStatusGood } from "react-icons/gr";
import { PiBeerSteinBold } from "react-icons/pi";
import { PiSmileyWinkBold } from "react-icons/pi";

// Icono de basurero representado como un componente SVG
const trashIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-trash"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="#ff2825"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
);

function TaskList({ todos, handleTaskAction, agregarTarea }) {
  // Obtener la fecha actual
  const currentDate = new Date();
  // no permanente  ----- Date time zone -----
  // const currentDate2 = new Date("July 21, 1983 01:02:00");
  const meses = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const dias = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const diastmstamp = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
  
  let dts = diastmstamp[currentDate.getDay()]

  
  let min0 = (currentDate.getUTCMinutes() < 10 ? [ 0 , currentDate.getUTCMinutes()] : [currentDate.getUTCMinutes()])
  console.log(min0)
  
  let mes = meses[currentDate.getMonth()];
  let dia = dias[currentDate.getDay()]
  let horas = currentDate.getHours()
  let hts = [(horas>11 ? horas -12 : horas),":",min0,(horas>12?'pm':'am')]
  let tmstamp = [dts,"-",[currentDate.getUTCDate(),"/",currentDate.getUTCMonth()+1,"/",currentDate.getUTCFullYear()]
                ,"- ",hts]
  //no permanente 

  // Obtener la fecha formateada
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'long',
  }).format(currentDate);

  return (
    // Contenedor principal de la lista de tareas
    <VStack
      spacing={0.5}
      // divider={<StackDivider />}
      
      
      p="0"
      borderRadius="12px"
      w="98%"
      maxW={{ base: '90vw', sm: '80vw', md:'75vw', lg: '70vw', xl: '55vw' }}
      minH="50vh"
      alignItems="center"
      justify={'space-around'}
      bg="gray.50"
      
      overflowY="auto"
    >
      {/* Encabezado de la lista con la fecha actual */}
      <HStack w="100%" bg="rgb(255,31,91)" p="1" mb={'6'}>
        <Container color={'white'} maxH={'40px'} >
      {/* Un Grid para lograr la estructura y comportamiento deseado para el "header" de nuestra TDlist */}
            {/* <Grid templateRows='repeat(1, 1fr)' templateColumns={{base:'repeat(5, 1fr)',md:'repeat(4, 1fr)',lg:'repeat(3, 1fr)'}}  */}
            <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(5, 1fr)' 
            fontFamily="Red Hat Display" alignItems={'center'} >
              <GridItem colSpan={1} colStart={1} colEnd={1} rowStart={1} >
                <Text fontSize={'26'}>{currentDate.getDate()}</Text></GridItem>
              <GridItem colSpan={1} colStart={2} colEnd={2} rowStart={1} textAlign={'initial'}>
                <Text fontSize={'10'}>{mes}<Text mt={'-0.5'} fontSize={'9'}>{currentDate.getFullYear()}</Text></Text></GridItem>
              <GridItem colStart={5} colEnd={5} rowStart={1} rowEnd={1} alignItems={'flex-end'}>
                {/* <Text fontSize={'10'}> {horas>11 ? horas -12 : horas}:{currentDate.getMinutes()}{horas>12?'pm':'am'}</Text> */}
                <Text fontSize={'10'}> {hts}</Text>
                <Text mt={'-0.5'}  fontSize={'8'}> {dia} </Text></GridItem>
            </Grid>
        </Container>
        
      </HStack>
      <VStack minH={{base:'30vh'}}>
        {/* Mensaje si no hay tareas */}
        {todos.length === 0 ? (
          <Badge colorScheme="red" p="4"  borderRadius="lg"  fontFamily="Red Hat Display" alignSelf="center">
            <HStack justify={'space-around'} fontSize={{base:'24px',sm:'30px',md:'34px',lg:'38px'}}><GrStatusGood color='green' /> 
              <PiSmileyWinkBold color="rgb(255,31,91)" />
              <PiBeerSteinBold color='maroon' /></HStack>
            <Text mt={2} fontSize={{base:'10px',sm:'11px',md:'13px',lg:'14px'}}>Sin pendientes, bravo!</Text> 
            <Text fontSize={{base:'8px',sm:'9px',md:'11px',lg:'12px'}}>Puede agregar o descansar.</Text>
          </Badge>
        ) : (

          <Grid>
          {/* // Mapeo de cada tarea para mostrarla con el componente TaskItem v .1 */}
          {todos.map((todo) => (
            <GridItem>
              <TaskItem ts={tmstamp} key={todo.id} todo={todo} handleTaskAction={handleTaskAction} />
            </GridItem>
          ))}
          </Grid>   
          // // Mapeo de cada tarea para mostrarla con el componente TaskItem v .1
          // todos.map((todo) => (
          //   <TaskItem ts={tmstamp} key={todo.id} todo={todo} handleTaskAction={handleTaskAction} />
          // ))
        )}
      </VStack>
      {/* Componente TaskForm para agregar nuevas tareas */}
      <TaskForm alignSelf={'end'} agregarTarea={agregarTarea} />
    </VStack>
  );
}


export default TaskList;
