# Blog API

This is a project created for learning Node.js by building an [API server](https://github.com/idontfeelsogood1/blog-api/tree/main/backend) and two front-end websites to make requests to the API endpoints to view and manage blog posts, comments, and users.

The server is built with Node.js and Express. I chose to write both front-end sites in React to get some more practice with the library, specifically in making calls to an API.

---

## API Server

**Repo:** [https://github.com/idontfeelsogood1/blog-api/tree/main/backend](https://github.com/idontfeelsogood1/blog-api/tree/main/backend)

Building the [API server](https://github.com/idontfeelsogood1/blog-api/tree/main/backend) was the focus of this project. The endpoints follow RESTful principles, with clear relationships between resources in the URL paths (i.e., `posts/:postId/comments/`) and correct HTTP methods for requested actions. All endpoints return standardized JSON objects.

One of the main learning outcomes of this project was to use JSON Web Tokens (JWTs) for request authentication. So, when a user has a successful login, a JWT token is generated on the server and then sent back to the client, where it is stored in localStorage and applied to the header on certain user- and admin-only requests (like creating and modifying data), which require a JWT in order to provide a successful response. I used `passport`'s JWT strategy to help implement this since I was already using `passport`'s local strategy for user's account creation and logging in.

For my `PostgreSQL` database, I used `Prisma` ORM to define model schema and retrieve/modify data. I had used Prisma on other projects before, but it was helpful to get more experience here on a bigger project, specifically in creating relationships between tables and querying them to retrieve related data (i.e., returning one object with the post data and comments associated with it).

I also added `express-validator` to validate requests' body data.

#### Tools:

* Prisma
* bcryptjs
* cors
* express
* express-validator
* jsonwebtoken
* passport
* passport-jwt
* passport-local

---

## User Blog

**Repo:** [https://github.com/idontfeelsogood1/blog-api/tree/main/userBlog](https://github.com/idontfeelsogood1/blog-api/tree/main/userBlog)

**Demo:** [https://cv-maker-99hc.vercel.app/](https://cv-maker-99hc.vercel.app/)

This site is the public blog built in `React`. Any user can view the list of posts and a single post, but to leave a comment on any post they must first create an account and login.

For displaying the posts, I used HTML/CSS. For making requests, I defined custom hooks called `useFetch` and `useMutation` to retrieve and modify data.

#### Features:

* View a list of posts.
* Create an account and login to leave a comment on a post.

#### Tools:

* React
* React Router

---

## Admin Dashboard

**Repo:** [https://github.com/idontfeelsogood1/blog-api/tree/main/privateBlog](https://github.com/idontfeelsogood1/blog-api/tree/main/privateBlog)

**Demo:** [https://blog-api-seven-blue.vercel.app/](https://blog-api-seven-blue.vercel.app/)

I also used `React` to create this Admin Dashboard. Only admin users are able to view the pages on this website for managing the posts, comments, and users.

The page tables are set up similarly to the post list on the User Blog with pagination handled by request parameters.

#### Features:

* Login with these credentials:
    * `Username: adminUserExample`
    * `Password: 12345678`
* View tables for the posts, comments.
* Add a new post, give it a title and write your content.
* Edit a post to publish it or set it as a draft, causing it to show up or not show up on the User Blog site.
* Delete comments.

#### Tools:

* React
* React Router
