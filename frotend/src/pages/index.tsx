import Head from "next/head";

import { Box, Container } from "@chakra-ui/react";
import { useEffect } from "react";

import Router from "next/router";
import ClientForm from "@/components/ClientForm";

const Home = () => {
  //   useEffect(() => {
  //     const userAuth = localStorage.getItem("user");

  //     if (!userAuth) {
  //       Router.push("/user/login");
  //     }
  //   }, []);

  return (
    <>
      <Head>
        <title>HOME | ContactList</title>
        <meta name="description" content="Projeto de lista de contatos" />
      </Head>
      <ClientForm />
    </>
  );
};

export default Home;
