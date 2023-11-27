import React, { useMemo, useState } from "react";
import {
  chakra,
  Button,
  List,
  ListItem,
  Heading,
  Flex,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";



export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const sortedTodos = useMemo(() => {
    if (filter.sort) {
      return [...todos].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }

    return todos;
  }, [filter.sort, todos]);
  const [text, setText] = useState("");

  const createTodoHandler = (text) => {
    setTodos((prevState) => [...prevState, { id: Date.now(), text }]);
    setText("");
    // a = [1,2,3] => b = [...[1,2,3], 4,5,6] = [1,2,3,4,5,6]
  };

  const removeTodoHandler = (id) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  return (
    <Flex flexDirection="column" m="1rem" gap="1rem" alignItems="center">
      <Heading textTransform="uppercase">Todo List</Heading>
      <List
        h="60vh"
        w="70vw"
        display="flex"
        flexDirection="column"
        overflowY="scroll"
        border="2px solid black"
        borderRadius="md"
        p="10px"
      >
        {sortedTodos.map((todo) => (
          <ListItem
            key={todo.id}
            display="flex"
            width='100%'
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid gray"
            py="8px"
          >
            <Text>{todo.text}</Text>
            <Button
              onClick={() => removeTodoHandler(todo.id)}
              colorScheme="blue"
            >
              Удалить
            </Button>
          </ListItem>
        ))}
      </List>
      <Flex>
        <chakra.form
          onSubmit={(e) => {
            e.preventDefault(); // Без перезагрузки приложения после добавления задачи
            createTodoHandler(text);
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="20px"
        >
          <Input
            placeholder="Напишите задачу..."
            maxLength={80}
            value={text}
            onChange={(e) => setText(e.target.value)}
            w="300px"
            h="45px"
          />
          <Button isDisabled={!text.trim().length} type="submit">
            Добавить задачу
          </Button>
        </chakra.form>
        <Select
          placeholder="Без сортировки"
          marginLeft='20px'
          value={filter.sort}
          onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
        >
          <option value='text'>По имени</option>
        </Select>
      </Flex>
    </Flex>
  );
};
