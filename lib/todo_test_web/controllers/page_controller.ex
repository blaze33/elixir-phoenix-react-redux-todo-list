defmodule TodoTestWeb.PageController do
  use TodoTestWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
