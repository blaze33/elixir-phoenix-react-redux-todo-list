defmodule TodoTestWeb.TodoView do
  use TodoTestWeb, :view
  alias TodoTestWeb.TodoView

  def render("index.json", %{todo: todo}) do
    %{data: render_many(todo, TodoView, "todo.json")}
  end

  def render("show.json", %{todo: todo}) do
    %{data: render_one(todo, TodoView, "todo.json")}
  end

  def render("todo.json", %{todo: todo}) do
    %{id: todo.id,
      label: todo.label}
  end
end
