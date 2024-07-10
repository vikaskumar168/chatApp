import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <>
      <Box
        className={`${
          selectedChat ? "flex" : "hidden"
        } md:flex items-center flex-col p-3 bg-white w-full md:w-2/3 rounded-lg border`}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </>
  );
};

export default ChatBox;
