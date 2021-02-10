import React from "react";
import Drawer from "../drawer/drawer";

// import Header from '../header/header';

export default function Main(props) {
  const { children } = props;
  return <Drawer>{children}</Drawer>;
}
