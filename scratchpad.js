
<% if(user === undefined) { %>
  <a class="link" href="/login">Login</a><a class="link" href="/register">Register</a>
<% } else { %>


  <%= user  %>
    <a class="link" href="/logout">Logout</a>

