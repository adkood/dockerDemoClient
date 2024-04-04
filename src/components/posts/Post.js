import { Box, Text, IconButton, Spacer, HStack } from '@chakra-ui/react';

const Post = ({ title, author, description, genre }) => {

  return (
    <Box
      width="800px" 
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={6}
      m={4}
      display="flex"
      alignItems="start"
      bg="white"
      position="sticky"  
      top="0"           
    >
      <Box flex="1">
        <Text fontSize="2xl" fontWeight="bold" mb={2} color="cornflowerBlue">
          {title}
        </Text>
        <Text fontSize="lg" fontWeight="medium" mb={2}>
          By {author}
        </Text>
        <Text fontSize="md" mb={4} color="gray.600">
          {description}
        </Text>
        <Text fontSize="md" fontWeight="semibold" color="purple.500">
          Genre: {genre}
        </Text>
      </Box>
    </Box>
  );
};

export default Post;
