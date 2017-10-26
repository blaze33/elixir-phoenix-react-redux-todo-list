defmodule TodoTest.Repo.Migrations.AddTodoCompletedField do
  use Ecto.Migration

  def change do
    alter table(:todo) do
      add :completed, :boolean
    end
  end
end
