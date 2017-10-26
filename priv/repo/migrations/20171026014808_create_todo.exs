defmodule TodoTest.Repo.Migrations.CreateTodo do
  use Ecto.Migration

  def change do
    create table(:todo) do
      add :label, :string

      timestamps()
    end

  end
end
