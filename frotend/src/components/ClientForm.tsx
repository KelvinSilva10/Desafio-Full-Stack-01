import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { createClient } from "../services/api";

type IFormData = {
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  password: string;
};

const ClientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>();

  const toast = useToast();

  const onSubmit = async (data: IFormData) => {
    // try {
    //   await createClient(data);
    //   toast({
    //     title: "Client created.",
    //     description: "Your new client was created successfully.",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // } catch (err) {
    //   console.error(err);
    //   toast({
    //     title: "Error",
    //     description: "An error occurred. Please try again later.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
    console.log(data);
  };

  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input {...register("name")} id="name" />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.firstEmail}>
          <FormLabel htmlFor="firstEmail">Primary Email</FormLabel>
          <Input {...register("firstEmail")} id="firstEmail" type="email" />
          {errors.firstEmail && (
            <FormErrorMessage>{errors.firstEmail.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.secondaryEmail}>
          <FormLabel htmlFor="secondaryEmail">Secondary Email</FormLabel>
          <Input
            {...register("secondaryEmail")}
            id="secondaryEmail"
            type="email"
          />
          {errors.secondaryEmail && (
            <FormErrorMessage>{errors.secondaryEmail.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.mainPhone}>
          <FormLabel htmlFor="mainPhone">Main Phone</FormLabel>
          <Input {...register("mainPhone")} id="mainPhone" type="tel" />
          {errors.mainPhone && (
            <FormErrorMessage>{errors.mainPhone.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.secondaryPhone}>
          <FormLabel htmlFor="secondaryPhone">Secondary Phone</FormLabel>
          <Input
            {...register("secondaryPhone")}
            id="secondaryPhone"
            type="tel"
          />
          {errors.secondaryPhone && (
            <FormErrorMessage>{errors.secondaryPhone.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              required
              focusBorderColor="blue.300"
              errorBorderColor="red.300"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ClientForm;
