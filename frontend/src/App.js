import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { Button, ButtonGroup } from "@chakra-ui/react";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";

function App() {
  
  return (
    <div className="App">
      
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} />
      {/* //if you want then we can use below method for routing */}
      {/* <Routes>
        <Route path="/" element={'<Homepage/>'}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
