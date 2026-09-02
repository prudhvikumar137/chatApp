"use strict";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  toast,
  VStack,
} from "@chakra-ui/react";
// import { application } from "express";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  // const [file, setFile] = useState(null);

  const toast = useToast();
  const history = useHistory();

  const hanleClick = () => {
    setShowPassword(!showPassword);
  };
  const hanleClickC = () => {
    setShowCPassword(!showCPassword);
  };

  const postDetails = (pics) => {
    if (pics.type === "image/jpg" || pics.type === "image/png") {
      let data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "coder-roadside");
      fetch("https://api.cloudinary.com/v1_1/coder-roadside/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => { });
      setLoading(false);
    } else {
      if (pics === undefined) {
        
        alert('please select the image')
      }
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
   setLoading(true);
   if (!name || !email || !password || !confirmPassword) {
     alert('all fields are required')
     setLoading(false);
     return;
   }
    if (password !== confirmPassword) {
     alert('passwor and confirm password must match')
     return;
   }
   try {
     const config = { headers: { "Content-type": "application/json", }, };
     
     const { data } = await axios.post("api/usersSec",{ name, email, password, pic },config);
     window.confirm('user refisterd successfully')
     localStorage.setItem("userInfo", JSON.stringify(data));
     setLoading(false);
     history.push("/chats");
   } catch (error) {
     toast({
         title: "Error Occured.",
        //  description: error.response.data.message,
         status: "error",
         duration: 9000,
         isClosable: true,
         position: "bottom",
        });
     setLoading(false);
   }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h={"1.75rem"} size="sm" onClick={hanleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel> Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showCPassword ? "text" : "password"}
            placeholder="Enter confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h={"1.75rem"} size="sm" onClick={hanleClickC}>
              {showCPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel> Upload picture</FormLabel>
        <Input type="file" p={1.5} accept="image/*" onChange={postDetails} />
      </FormControl>
      <Button
        // bg="cyan"
        colorScheme='teal'
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default UserSignUp;
// "use strict";
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   useToast,
//   VStack,
// } from "@chakra-ui/react";
// // import { application } from "express";
// import React, { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const UserSignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCPassword, setShowCPassword] = useState(false);
//   const [pic, setPic] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);

//   const toast = useToast();
//   const history = useHistory();

//   const hanleClick = () => {
//     setShowPassword(!showPassword);
//   };
//   const hanleClickC = () => {
//     setShowCPassword(!showCPassword);
//   };

//   const postDetails = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const submitHandler = async () => {
//     if (!name || !email || !password || !confirmPassword) {
//       window.alert("all fields are required");
//     } else {
//       const formData = new FormData();
//       formData.append("image", file);
//       const registerUserData = {
//         name,
//         email,
//         password,
//         confirmPassword,
//         pic:formData,
//       };
//       console.log('**' );

//       try {
//         const response = await axios.post("/api/usersSec", registerUserData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         console.log("File uploaded successfully:", response.data);
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     }
//   };

//   return (
//     <VStack spacing={"5px"}>
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="email" isRequired>
//         <FormLabel> Email</FormLabel>
//         <Input
//           placeholder="Enter Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel> Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h={"1.75rem"} size="sm" onClick={hanleClick}>
//               {showPassword ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="confirm-password" isRequired>
//         <FormLabel> Confirm Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={showCPassword ? "text" : "password"}
//             placeholder="Enter confirm Password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h={"1.75rem"} size="sm" onClick={hanleClickC}>
//               {showCPassword ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="pic" isRequired>
//         <FormLabel> Upload picture</FormLabel>
//         <Input type="file" p={1.5} accept="image/*" onChange={postDetails} />
//       </FormControl>
//       <Button
//         bg="cyan"
//         width={"100%"}
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         // isLoading={loading}
//       >
//         Sign Up
//       </Button>
//     </VStack>
//   );
// };

// export default UserSignUp;
