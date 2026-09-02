import axios from "axios";
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../components/Athentication/Login";
import SignUp from "../components/Athentication/SignUp";
import UserSignUp from "../components/Athentication/UserSignUp";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
      const history = useHistory();
      useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));


        if (user) {
          history.push("/chats");
        }
      }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        textAlign={"center"}
      >
        <Text fontSize="4x2" fontFamily="work sans" color="black">
          Talk A Tive
        </Text>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderWidth={"1px"}
        borderRadius={"lg"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
            <Tab width="50%">Sign Up User</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
            {/* <TabPanel>
              <UserSignUp />
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
