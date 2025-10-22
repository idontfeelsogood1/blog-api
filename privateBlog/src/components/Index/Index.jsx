import style from "./Index.module.css"
export default function Index() {
    return (
        <div className={style.container}>
            <h1>Welcome to the Admin Dashboard!</h1>
            <p className={style.paragraph}>This is a project created for learning
                Node.js by building an <a target="_blank" href="https://github.com/idontfeelsogood1/blog-api/tree/main/backend">API server</a> and two 
                front-end websites (this one and a public <a href="https://blogapiuserblog-mnbrsh1gr-idontfeelsogood1s-projects.vercel.app" target="_blank">User Blog</a>) 
                to make requests to the API endpoints to view and 
                manage blog posts, comments, and users.</p>
            <p className={style.paragraph}>The server is built with Node.js and Express, and both front-end sites in React.</p>
            <p className={style.paragraph}>To learn more about the whole project and how it is built, visit the <a target="_blank" href="/about">About</a> page.</p>
        </div>
    )
}