defmodule TodoTestWeb.TodoChannel do
  use TodoTestWeb, :channel

  def join("todo", payload, socket) do
    if authorized?(payload) do
      todos = TodoTest.Todos.list_todo()
      {:ok, %{todos: TodoTestWeb.TodoView.render("index.json", todo: todos)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (todo:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("new:todo", payload, socket) do
    {:ok, created} = TodoTest.Todos.create_todo(payload)
    created_json = TodoTestWeb.TodoView.render("todo.json", todo: created)
    broadcast! socket, "new:todo", created_json
    {:reply, {:ok, created_json}, socket}
  end

  def handle_in("update:todo", payload, socket) do
    todo = TodoTest.Todos.get_todo!(payload["id"])
    TodoTest.Todos.update_todo(todo, payload)
    broadcast! socket, "update:todo", payload
    {:noreply, socket}
  end

  def handle_in("delete:todo", payload, socket) do
    todo = TodoTest.Todos.get_todo!(payload["id"])
    TodoTest.Todos.delete_todo(todo)
    broadcast! socket, "delete:todo", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
