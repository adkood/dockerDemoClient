import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';
import Post from '../posts/Post';
import AddPost from '../posts/AddPost';
import { VStack, FormControl, FormLabel, Select, Button, Flex, Box, Heading, Avatar, Input } from '@chakra-ui/react';
import io from 'socket.io-client';

const MyProfile = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const userId = useSelector((state) => state.auth.userId);
    const userToken = useSelector((state) => state.auth.userToken);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [fetchTrigger, setFetchTrigger] = useState(true);

    useEffect(() => {
        const socket = io('https://dockerdemoserver.onrender.com', { transports: ['websocket', 'polling', 'flashsocket'] });

        socket.on('addBook', (book) => {
            setPosts((prev) => [book, ...prev]);
        })

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`https://dockerdemoserver.onrender.com/api/books?title=${title}&author=${author}&genre=${genre}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }, {
                    withCredentials: true
                });
                console.log(response);
                setPosts(response.data.data.books);
            } catch (error) {
                alert("Error fetching posts")
                console.error('Error fetching posts:', error);
            }
        };
        fetchUserInfo();
    }, [userId, userToken, fetchTrigger]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://dockerdemoserver.onrender.com/api/logout', {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            console.log(response);
            dispatch(authActions.setToken(""));
            dispatch(authActions.setId(""));
            dispatch(authActions.logout());
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <VStack width={"100%"} height={"100%"} overflow={"scroll"}>
            <Flex padding={"5px"} height={"10%"} direction={{ base: 'column', md: 'row' }} boxShadow="lg" justify="space-between" w="80%" p={4} flexWrap="wrap">
                <Box height={"100%"} flex="1" mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 4 }}>
                    <Avatar src="https://bit.ly/broken-link" size="md" />
                </Box>

                <Box height={"100%"} flex="1" mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 4 }}>
                    <FormControl>
                        <Input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            placeholder="Search by Title"
                            borderRadius="md"
                            p={2}
                            w="100%"
                            border="1px solid #CBD5E0"
                            _focus={{ border: "1px solid #38A169" }}
                        />
                    </FormControl>
                </Box>

                <Box height={"100%"} flex="1" mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 4 }}>
                    <FormControl>
                        <Input
                            type="text"
                            name="author"
                            value={author}
                            onChange={(e) => { setAuthor(e.target.value) }}
                            placeholder="Search by Author"
                            borderRadius="md"
                            p={2}
                            w="100%"
                            border="1px solid #CBD5E0"
                            _focus={{ border: "1px solid #38A169" }}
                        />
                    </FormControl>
                </Box>

                <Box height={"100%"} flex="1" mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 4 }}>
                    <FormControl>
                        <Select
                            name="genre"
                            value={genre}
                            onChange={(e) => { setGenre(e.target.value) }}
                            borderRadius="md"
                            w="100%"
                            border="1px solid #CBD5E0"
                            _focus={{ border: "1px solid #38A169" }}
                        >
                            <option value="">All Genres</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Classic">Classic</option>
                        </Select>
                    </FormControl>
                </Box>

                <Box height={"100%"} flex="1" alignSelf="flex-end" mt={{ base: 4, md: 0 }}>
                    <Button p={2} onClick={() => setFetchTrigger(!fetchTrigger)} w="100%" bg="#38A169" color="white" _hover={{ bg: "#2C7A7B" }}>
                        Search
                    </Button>
                </Box>
            </Flex>
            <Flex width={"100%"} height={"80%"}>
                <Flex p={4} width={"40%"} >
                    <AddPost />
                </Flex>
                <Box style={{ padding: '20px', width: "60%", overflow: "scroll", scrollbarWidth: "thin", scrollbarColor: "#6495ed #ffffff",}}>
                    {posts.length > 0 ? (
                        <Box>
                            {posts.map((ele) => {
                                return <Post key={ele._id} title={ele.title} author={ele.author} description={ele.description} genre={ele.genre} />
                            })}
                            <Button onClick={handleLogout} style={{
                                position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer'
                            }}>Logout</Button>
                        </Box>
                    ) : (
                        <Heading>No posts found</Heading>
                    )}
                </Box>
            </Flex>
        </VStack>
    );
};

export default MyProfile;
