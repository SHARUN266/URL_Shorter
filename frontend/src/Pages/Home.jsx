import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import SVG from "../Assets/URL.svg";
import { RxMagicWand } from "react-icons/rx";
import { GiQuillInk } from "react-icons/gi";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
export default function Home() {
  const toast = useToast();
  const [short, setShort] = useState("");

  const [flag, setFlag] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState({
    fullURL: "",
    short: "",
  });
  function handleChange(e) {
    const { value, name } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  }
  async function handleClick() {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/shortUrl", text);
      setFlag(!flag);
      toast({
        title: `Your long Url converted into short url successfully!`,
        position: "top-right",
        isClosable: true,
        status: "success",
      });
      GetURL();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      
      toast({
        title: `${e.response.data}`,
        position: "top-right",
        isClosable: true,
        status: "error",
        duration: 15000,
      });
    }
  }
  useEffect(() => {}, [flag]);
  async function GetURL() {
    setLoading(true);
    try {
      let { data } = await axios.get("http://localhost:8080/");
      setShort("http://localhost:8080/" + data[data.length - 1].short);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  }
 

  return (
    <Stack
      h={["80vh", "70vh", "60vh"]}
      p="1rem"
      w={["95%", "70%", "40%"]}
      m="auto"
      bg="#fff"
      shadow={"lg"}
      borderRadius={"lg"}
      justifyContent={"center"}
      gap={"10%"}
    >
      <FormControl>
        <FormLabel>
          <Flex gap={"15px"}>
            <Image src={SVG} />
            <Text color={"#343a40"}>Enter a long URL to make a ShortURL</Text>
          </Flex>
        </FormLabel>
        <Input
          mt="2%"
          h="75%"
          shadow={
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;"
          }
          required
          name="fullURL"
          onChange={(e) => handleChange(e)}
          type="url"
          placeholder="Enter full URL"
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          <Flex alignItems={"center"} gap={"15px"}>
            <RxMagicWand fontWeight={700} fontSize={"1.5em"} />
            <Text color={"#343a40"}>Customize your link</Text>
          </Flex>
        </FormLabel>
        <Input
          name="short"
          mt="2%"
          h="75%"
          shadow={
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;"
          }
          onChange={(e) => handleChange(e)}
          placeholder={"Enter customise URL"}
          type="url"
        />
      </FormControl>
      {short == "" ? (
        ""
      ) : (
        <FormControl>
          <FormLabel>
            <Flex alignItems={"center"} gap={"15px"}>
              <GiQuillInk fontWeight={700} fontSize={"1.5em"} />
              <Text color={"#343a40"}>Your short link is here...</Text>
            </Flex>
          </FormLabel>
          <Box w="100%" mt="5%" fontFamily={"sans-serif"} textAlign={"center"}>
            <Link target="_blank" textDecoration={"none"} href={short}>
              <Text fontWeight={700} fontSize={"xl"} color="blue">
                {short}
              </Text>
            </Link>
          </Box>
        </FormControl>
      )}

      <Button
        h="10%"
        isLoading={isLoading ? true : false}
        shadow={"md"}
        onClick={handleClick}
        fontSize={"xl"}
        colorScheme={"green"}
      >
        Make shortUrl!
      </Button>
    </Stack>
  );
}
