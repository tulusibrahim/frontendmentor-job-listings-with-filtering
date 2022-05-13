import { ChakraProvider, Flex, Image } from '@chakra-ui/react'
import { DarkGrayishCyan, DesaturatedDarkCyan, fontFamily, LightGrayishCyan, LightGrayishCyanBg, VeryDarkGrayishCyan } from './helper';
import bgHeaderMobile from './bg-header-mobile.svg'
import bgHeaderDesk from './bg-header-desktop.svg'
import data from './data.json'
import React, { useState, useEffect } from 'react';

function App() {
  const [windowSize, setWindowSize] = useState(null)
  const [filters, setFilters] = useState([])

  const toggleFilter = (params) => {
    if (filters.includes(params)) {
      let temp = filters.filter(i => i !== params)
      setFilters([...temp])
      // let filterData = data.filter(i=> i.role == params || i.languages == params || i.level == params || i.tools == params)
    }
    else {
      setFilters(e => [...e, params])
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  const Card = ({ i }) => {
    let img = i.company.toLowerCase().replaceAll(' ', '-').replaceAll('.', '')
    return (
      <Flex w={['90%', '90%', '85%']} borderLeft={i.new == true && i.featured == true ? `4px ${DesaturatedDarkCyan} solid` : null} h='fit-content' position={'relative'} mt='30px' px={'20px'} pb={'10px'} fontFamily={fontFamily} align={['baseline', 'baseline', 'center']} direction={['column', 'column', 'row']} justify='center' fontSize={'15px'} borderRadius='5px' boxShadow='0px 0px 10px -3px rgba(0,0,0,0.75)' >
        <Flex position={['absolute', 'absolute', 'static']} top={['-15px', '-15px', '0px']} px={['0px', '0px', '10px']} align='center' w={['fit-content', 'fit-content', '10%']} h={['fit-content', 'fit-content', '100%']}>
          <Image src={`./images/${img}.svg`} w={['30px', '30px', 'auto']} h={['30px', '30px', 'auto']} objectFit='contain' />
        </Flex>
        <Flex direction={'column'} mt='20px' mb={'10px'} w={['100%', '100%', '25%']}>
          <Flex my={'3px'}>
            <Flex fontWeight={700} mr='10px' color={DesaturatedDarkCyan}>
              {i.company}
            </Flex>
            {
              i.new && <Flex align={'center'} justify={'center'} bg={DesaturatedDarkCyan} color='white' borderRadius='full' mr={'7px'} px={'7px'} >NEW!</Flex>
            }
            {
              i.featured && <Flex align={'center'} justify={'center'} bg={VeryDarkGrayishCyan} color='white' borderRadius='full' px={'7px'}>&nbsp;FEATURED</Flex>
            }
          </Flex>
          <Flex fontWeight={700}>
            {i.position}
          </Flex>
          <Flex direction={'row'} w={['fit-content', 'fit-content', '100%']}>
            <Flex color={DarkGrayishCyan}>
              {i.postedAt}
            </Flex>
            &nbsp;<Flex color={DarkGrayishCyan}>•</Flex>&nbsp;
            <Flex color={DarkGrayishCyan}>
              {i.contract}
            </Flex>
            &nbsp;<Flex color={DarkGrayishCyan}>• </Flex>&nbsp;
            <Flex color={DarkGrayishCyan}>
              {i.location}
            </Flex>
          </Flex>
        </Flex>
        <hr />
        <Flex wrap={'wrap'} w='100%' justify={['flex-start', 'flex-start', 'flex-end']} align={['center', 'center', 'center']} py='10px'>
          <Flex px={'12px'} h='fit-content' py={'2px'} mr='15px' my='5px' borderRadius={'5px'} color={DesaturatedDarkCyan} bg={'rgb(219,238,238)'} fontWeight={700}>
            {i.role}
          </Flex>
          <Flex px={'12px'} h='fit-content' py={'2px'} mr='15px' my='5px' borderRadius={'5px'} color={DesaturatedDarkCyan} bg={'rgb(219,238,238)'} fontWeight={700} >
            {i.level}
          </Flex>
          {
            i.languages.map(i => (
              <Flex cursor={'pointer'} onClick={() => toggleFilter(i)} px={'12px'} h='fit-content' py={'2px'} mr='15px' my='5px' borderRadius={'5px'} color={DesaturatedDarkCyan} bg={'rgb(219,238,238)'} fontWeight={700}>
                {i}
              </Flex>
            ))
          }
          {
            i.tools.length > 0 &&
            i.tools.map(i => (
              <Flex px={'12px'} h='fit-content' py={'2px'} mr='15px' my='5px' borderRadius={'5px'} color={DesaturatedDarkCyan} bg={'rgb(219,238,238)'} fontWeight={700}>
                {i}
              </Flex>
            ))
          }
        </Flex>
      </Flex >
    )
  }
  return (
    <ChakraProvider>
      <Flex w={'100vw'} h='fit-content' direction={'column'} align='center' bg={LightGrayishCyanBg} position='relative'>
        {/* header */}
        <Flex w={'100%'} h='20%' bgRepeat='no-repeat' bg={DesaturatedDarkCyan} >
          {
            windowSize > 700 ?
              <Image src={bgHeaderDesk} w='100%' h='100%' />
              :
              <Image src={bgHeaderMobile} w='100%' h='100%' />
          }
        </Flex>

        {
          filters.length > 0 &&
          <Flex w='90%' h={'auto'} py='5px' boxShadow='0px 0px 10px -3px rgba(0,0,0,0.75)' bg='white' position={'relative'} top='-20px' borderRadius={'5px'} direction={'row'} align='center' justify='center'>
            <Flex wrap='wrap' w='80%'>
              {
                filters.map(i => (
                  <Flex pl={'12px'} h='fit-content' ml='20px' my='5px' borderRadius={'5px'} color={DesaturatedDarkCyan} bg={'rgb(219,238,238)'} fontWeight={700} justify='space-between'>
                    {i}
                    <Flex cursor={'pointer'} onClick={() => toggleFilter(i)} w='100%' h={'100%'} ml='8px' px='8px' bg={DesaturatedDarkCyan} color='white' borderRightRadius={'5px'}>X</Flex>
                  </Flex>
                ))
              }
            </Flex>
            <Flex h='100%' w='20%' align='center' justify='center' fontWeight={700} color={DarkGrayishCyan} onClick={() => setFilters([])}>
              Clear
            </Flex>
          </Flex>
        }

        {/* body */}
        <Flex w={'100%'} h='auto' direction='column' justify={'flex-start'} align='center' mt={filters.length ? '10px' : '0px'} pb='40px'>
          {
            filters.length > 0 ?
              data.map((i, id) => (
                filters.includes(...i.languages) &&
                // filters.includes(i.languages) && filters.includes(i.role) && filters.includes(i.level) &&
                <Card i={i} key={id} />
              ))
              :
              data.map((i, id) => (
                <Card i={i} key={id} />
              ))
          }
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
