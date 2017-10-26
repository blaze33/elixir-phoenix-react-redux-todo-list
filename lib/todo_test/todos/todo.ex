defmodule TodoTest.Todos.Todo do
  use Ecto.Schema
  import Ecto.Changeset
  alias TodoTest.Todos.Todo


  schema "todo" do
    field :label, :string
    field :completed, :boolean

    timestamps()
  end

  @doc false
  def changeset(%Todo{} = todo, attrs) do
    todo
    |> cast(attrs, [:label, :completed])
    |> validate_required([:label, :completed])
  end
end
