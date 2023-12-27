import { io } from "socket.io-client";
import { insertManyItemsInList } from "../utils/lists";
import { IListItem } from "../types/ws";
import { useState } from "react";

const SERVER_HOST = "localhost";
const SERVER_PORT = "3000";

const socket = io(`ws://${SERVER_HOST}:${SERVER_PORT}`);

export const useSocket = () => {
  const [listItems, setListItems] = useState<IListItem[]>([]);

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log("disconnect", socket.id); // undefined
  });

  socket.on("data", (data: IListItem[]) => {
    console.log(data);

    const newList = insertManyItemsInList(data, listItems);
    setListItems(newList);
  });

  return listItems;
};
