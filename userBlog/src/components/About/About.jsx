export default function About() {
    return (
        <div>
            <div>
                <h1>Blog Api</h1>
                <div>
                    <p>This is a project created for learning
                        Node.js by building an API server and
                        two front-end websites to make requests to the
                        API endpoints to view and manage blog posts,
                        comments, and users.</p>
                    <p>The server is built with Node.js and Express.
                        I chose to write both front-end sites in
                        React to get some more practice with the library,
                        specifically in making calls to an API.</p>
                </div>
            </div>

            <div>
                <div>
                    <h2>API Server</h2>
                    <h4>Repo: Some github link</h4>
                </div>
                <div>
                    <p>Building the API server was the focus of this project.
                        The endpoints follow RESTful principles, with clear
                        relationships between resources in the URL paths
                        (i.e., /posts/:postId/comments) and correct HTTP
                        methods for requested actions. All endpoints return
                        standardized JSON objects.</p>
                    <p>One of the main learning outcomes of this project was to use
                        JSON Web Tokens (JWTs) for request authentication.
                        So, when a user has a successful login, a JWT token
                        is generated on the server and then sent back to the
                        client, where it is stored in localStorage and applied
                        to the header on certain user- and admin-only requests
                        (like creating and modifying data), which require a JWT
                        in order to provide a successful response. I used
                        passport's JWT strategy to help implement this since
                        I was already using passport's local strategy for user's
                        account creation and logging in.</p>
                    <p>For my PostgreSQL database, I used Prisma ORM to
                        define model schema and retrieve/modify data.
                        I had used Prisma on other projects before,
                        but it was helpful to get more experience here
                        on a bigger project, specifically in creating relationships
                        between tables and querying them to retrieve related data
                        (i.e., returning one object with the post data and comments
                        associated with it).</p>
                    <p>I also added express-validator to validate requests' body data.</p>
                </div>
                <div>
                    <h4>Tools:</h4>
                    <ul>
                        <li>Prisma</li>
                        <li>bcryptjs</li>
                        <li>cors</li>
                        <li>express</li>
                        <li>express-validator</li>
                        <li>jsonwebtoken</li>
                        <li>passport</li>
                        <li>passport-jwt</li>
                        <li>passport-local</li>
                    </ul>
                </div>
            </div>

            <div>
                <div>
                    <h2>User Blog</h2>
                    <h4>Repo: Some github link</h4>
                    <h4>Demo: Some demo link</h4>
                </div>
                <div>
                    <p>This site is the public blog built in React.
                        Any user can view the list of posts and a
                        single post, but to leave a comment on any
                        post they must first create an account and
                        login.</p>
                    <p>For displaying the posts, I used HTML/CSS. For making
                        requests, I defined custom hooks called useFetch and
                        useMutation to retrieve and modify data.</p>
                </div>
                <div>
                    <h4>Features:</h4>
                    <ul>
                        <li>View a list of posts.</li>
                        <li>Create an account and login to leave a comment on a post.</li>
                    </ul>
                    <h4>Tools:</h4>
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                    </ul>
                </div>
            </div>

            <div>
                <div>
                    <h2>Admin Dashboard</h2>
                    <h4>Repo: Some github link</h4>
                    <h4>Demo: Some demo link</h4>
                </div>
                <div>
                    <p>I also used React to create this Admin Dashboard. 
                        Only admin users are able to view the pages on this 
                        website for managing the posts, comments, and users.</p>
                    <p>The page tables are set up similarly to the post list on the 
                        User Blog with pagination handled by request parameters.</p>
                </div>
                <div>
                    <h4>Features:</h4>
                    <ul>
                        <li>Login with these credentials: </li>
                        <ul> 
                            <li>Username: adminUserExample</li>
                            <li>Password: 12345678</li>
                        </ul>
                        <li>View tables for the posts, comments.</li>
                        <li>Add a new post, give it a title and write your content.</li>
                        <li>Edit a post to publish it or set it as a draft, causing it to show up or not show up on the User Blog site.</li>
                        <li>Delete comments.</li>
                    </ul>
                    <h4>Tools: </h4>
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}