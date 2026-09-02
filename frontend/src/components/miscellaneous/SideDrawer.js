"use strict";
import {
  Box,
  Button,
  Menu,
  Text,
  Tooltip,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import ChatLoading from "../ChatLoading";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../Config/ChatLogics";
// import { accessChat } from "../../../../backend/controllers/chatControllers";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
import "./SideDrawer.css";

const SideDrawer = () => {
  const [search, setSearch] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [noResultsFound, setNoResultsFound] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  useEffect(() => {
    // setSearch(true);
  }, []);
  const searchHandler = async (searchData) => {
    // console.log(searchData);

    if (!searchData) {
      setSearch(true);
      return;
    } else {
      setSearch(false);
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/user?search=${searchData}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
      if (data.length === 0) {
        console.log("**", data.length);

        setNoResultsFound(true);
      } else {
        console.log("**", data.length);
        setNoResultsFound(false);
      }
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Faild to load the search respusplt",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to access the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        width="100%"
        padding="10px 5px 10px 5px"
        borderWidth="5px"
      >
        <Tooltip
          label="search User to chat"
          hasArrow
          placeContent={"bottom-end"}
        >
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily={"work sans"}>
          Talk a Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
              <BellIcon fontSize={"2xl"} m={1} />
              {notification.length ? (
                <Badge
                  // my={5}
                  ml="-3"
                  fontSize="0.5em"
                  colorScheme="green"
                  style={{
                    borderRadius: "10px",
                    textAlign: "center",
                    height: "10px",
                    width: "12px",
                  }}
                  pb={3}
                >
                  <span id="notificationCount">{notification.length} </span>
                </Badge>
              ) : (
                <></>
              )}
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="search By name or mail"
                mr={2}
                // value={search}
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
              />
              {/* <Button onClick={searchHandler}>Go</Button> */}
            </Box>
            {loading ? (
              <ChatLoading />
            ) : search ? (
              <span>Search Here</span>
            ) : noResultsFound ? (
              <p>Not Found</p>
            ) : (
              searchResult &&
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
