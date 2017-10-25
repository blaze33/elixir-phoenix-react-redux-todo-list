# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :todo_test,
  ecto_repos: [TodoTest.Repo]

# Configures the endpoint
config :todo_test, TodoTestWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NmwMWEO6KltgwPtsiUvU7wHjD1CA5hvN7FxLurSx0JFSzLTnJAyKNeyvxfZMfg7m",
  render_errors: [view: TodoTestWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TodoTest.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
