import { useAuth0 } from "@auth0/auth0-react";
import LogOut from "../logout/LogOut";
import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import TodoItem from "../../components/todo-item/TodoItem";
import Button from "../../components/button/Button";
import "../../App.css";
import Modal from "../../components/modal/Modal";
import EditForm from "../../components/editform/EditForm";
import AddForm from "../../components/addtodoform/AddTodoForm";

const getStoredValuesFromLocalStorage = () => {
  const storedItems = localStorage.getItem("toDoList");
  return storedItems ? JSON.parse(storedItems) : []; // transforma stringul in obiect
};

const Profile = (props) => {
  const { isAuthenticated, isLoading } = useAuth0();

  const [toDoList, setToDoList] = useState(getStoredValuesFromLocalStorage);
  const [isOpen, setIsOpen] = useState(false);
  const [editState, setEditState] = useState(null);

  useEffect(() => {
    const todosToSave = JSON.stringify(toDoList); // trasnform obiectul in string

    localStorage.setItem("toDoList", todosToSave);
  }, [toDoList]);

  useEffect(() => {
    if (isOpen === false) {
      setEditState(null);
    }
  }, [isOpen]);

  const addingTeam = (todo) => {
    const id = Math.random().toString(36).slice(2, 10);
    setToDoList((prevState) => [
      ...prevState,
      { ...todo, id: id, completed: false },
    ]);
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onCheckTodo = (item) => {
    setToDoList((prevState) => {
      const newState = prevState.map((team) => {
        if (team.id === item.id) {
          return { ...team, completed: item.value };
        }
        return team;
      });
      return newState;
    });
  };

  const handleDeleteToDo = (id) => {
    setToDoList((prevState) =>
      prevState.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const onEdit = (id) => {
    const gaseste = toDoList.find((item) => {
      return item.id === id;
    });
    console.log("edit");
    setEditState(gaseste);
    setIsOpen(true);
  };

  const onEditUpdateData = (item) => {
    setToDoList((prevState) => {
      const newState = prevState.map((team) => {
        if (item.id === team.id) {
          return {
            ...team,
            id: item.id,
            title: item.title,
            description: item.description,
            completed: item.completed,
          };
        }
        return team;
      });
      setIsOpen(false);
      return newState;
    });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div>
        {/* 
            This is your Create Card component.
          */}
        <Modal isOpen={isOpen} onClose={closeModal}>
          {!editState ? (
            <AddForm onAddTeam={addingTeam} onCreateClick={openModal} />
          ) : (
            <EditForm
              intialData={editState}
              onEditUpdateData={onEditUpdateData}
            />
          )}
        </Modal>

        {/* 
          My Todos
        */}

        <Card>
          <h2>MY TODOS</h2>

          <Button onClick={openModal}>Add +</Button>

          <h3>Incompleted</h3>
          <div className="separator"></div>
          <div className="list-container">
            {toDoList
              .filter((val) => !val.completed)
              .map((val) => (
                <TodoItem
                  key={val.id}
                  completed={val.completed}
                  title={val.title}
                  description={val.description}
                  onCheckBoxChange={onCheckTodo}
                  id={val.id}
                  isOpen={isOpen}
                  onCloseEdit={closeModal}
                  newTodo={handleDeleteToDo}
                  editButton={onEdit}
                />
              ))}
          </div>

          <h3>Completed</h3>
          <div className="separator"></div>
          <div className="list-container">
            {toDoList
              .filter((val) => val.completed)
              .map((val) => (
                <TodoItem
                  key={val.id}
                  completed={val.completed}
                  title={val.title}
                  description={val.description}
                  onCheckBoxChange={onCheckTodo}
                  id={val.id}
                  isOpen={isOpen}
                  onCloseEdit={closeModal}
                  newTodo={handleDeleteToDo}
                  editButton={onEdit}
                />
              ))}
          </div>
        </Card>
        <LogOut />
      </div>
    )
  );
};

export default Profile;
