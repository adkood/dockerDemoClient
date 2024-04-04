import { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Textarea,
  Select,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddPost = () => {

  const userToken = useSelector((state) => state.auth.userToken)
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const addBookHandler = async () => {
    try {
      const bookInfo = {
        title,
        author,
        description: desc,
        genre
      };

      console.log(bookInfo);

      if (!title || !author || !desc || !genre) {
        toast({
          status: "error",
          title: "Invalid Field !",
          duration: "2000",
          isClosable: true
        })
      }

      const response = await axios.post('https://dockerdemoserver.onrender.com/api/books', bookInfo, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }, {
        withCredentials: true,
      });

      console.log(response);
      toast({
        status: "success",
        title: "Book Added to database !",
        duration: "3000",
        isClosable: true
      });

    }
    catch (err) {
      console.log(err);
      toast({
        status: "error",
        title: "Cannot add book !",
        duration: "2000",
        isClosable: true
      })
    }
  }

  return (
    <Flex height="70%" width={"100%"} direction={'column'} p={20}>
      <Stack align="center" width="100%">
        <Heading color={"cornflowerblue"} fontSize="3xl">ADD A NEW BOOK</Heading>
      </Stack>
      <VStack
        as="form"
        spacing={8}
        bg={useColorModeValue('white', 'gray.700')}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5, sm: 10 }}
        w="100%"
      >
        <VStack spacing={4} w="100%">
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input onChange={(e) => { setTitle(e.target.value) }} rounded="md" type="text" />
          </FormControl>
          <FormControl id="author">
            <FormLabel>Author</FormLabel>
            <Input onChange={(e) => { setAuthor(e.target.value) }} rounded="md" type="text" />
          </FormControl>
          <FormControl id="genre">
            <FormLabel>Genre</FormLabel>
            <Select onChange={(e) => { setGenre(e.target.value) }} rounded="md">
              <option value="">All Genres</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Fiction">Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Classic">Classic</option>
            </Select>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea onChange={(e) => { setDesc(e.target.value) }} rounded="md" />
          </FormControl>
        </VStack>
        <VStack w="100%">
          <Button
            bg="green.300"
            color="white"
            _hover={{
              bg: 'green.500'
            }}
            rounded="md"
            w="100%"
            onClick={addBookHandler}
          >
            Add Book
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default AddPost;
