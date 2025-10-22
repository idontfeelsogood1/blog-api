const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- 1. Clear existing data ---
  // Delete in reverse order of creation to respect relations
  await prisma.comment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();
  console.log('Cleared existing data.');

  // --- 2. Create Users ---
  const hashedPassword = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: {
      username: 'alice',
      hash: hashedPassword,
      isWriter: true, // Alice is our writer
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'bob',
      hash: hashedPassword,
      isWriter: false,
    },
  });

  const charlie = await prisma.user.create({
    data: {
      username: 'charlie',
      hash: hashedPassword,
      isWriter: false,
    },
  });

  console.log(`Created users: ${alice.username}, ${bob.username}, ${charlie.username}`);

  // --- 3. Create Blog Posts (by Alice) ---
  const blog1 = await prisma.blog.create({
    data: {
      title: 'First Post: My Journey with Prisma',
      body: "Welcome to my new blog! This is my first post, where I'll be talking about my experience setting up this API. Prisma makes database interactions so intuitive.",
      published: true,
      authorId: alice.id,
    },
  });

  const blog2 = await prisma.blog.create({
    data: {
      title: 'Second Post: Thoughts on React',
      body: 'Just a quick draft about React. I find hooks to be a powerful feature, but they come with their own learning curve. More on this later...',
      published: false, // This one is a draft
      authorId: alice.id,
    },
  });

  const blog3 = await prisma.blog.create({
    data: {
      title: 'Third Post: Securing a Node.js API',
      body: "Today let's talk about security. It's a critical piece of any application. We implemented JWTs (JSON Web Tokens) using Passport.js, which provides a stateless authentication strategy. This means our server doesn't need to store session information. We also use bcrypt to hash passwords, which is a must-do. Never store passwords in plain text!",
      published: true,
      authorId: alice.id,
    },
  });

  console.log(`Created ${await prisma.blog.count()} blogs.`);

  // --- 4. Create Comments ---
  const comment1 = await prisma.comment.create({
    data: {
      body: 'Great first post, Alice! Looking forward to reading more.',
      userId: bob.id,
      blogId: blog1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      body: 'I agree, Prisma is fantastic. Did you have any trouble with the relations?',
      userId: charlie.id,
      blogId: blog1.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      body: "Thanks, Bob! And to Charlie: The relations were tricky at first, especially with `onDelete: Cascade`, but the documentation is excellent. Glad you're enjoying the blog!",
      userId: alice.id, // Author replies to her own post
      blogId: blog1.id,
    },
  });

  const comment4 = await prisma.comment.create({
    data: {
      body: 'This security post is super helpful. I was just wondering how to handle JWTs.',
      userId: bob.id,
      blogId: blog3.id,
    },
  });

  console.log(`Created ${await prisma.comment.count()} comments.`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
