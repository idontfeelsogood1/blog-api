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
  console.log('Creating users...');
  const hashedPassword = await bcrypt.hash('12345678', 10);

  const adminUserExample = await prisma.user.create({
    data: {
      username: 'adminUserExample',
      hash: hashedPassword,
      isWriter: true, // Alice is our main writer
    },
  });

  const alice = await prisma.user.create({
    data: {
      username: 'alice',
      hash: hashedPassword,
      isWriter: true, // Alice is our main writer
    },
  });

  const diana = await prisma.user.create({
    data: {
      username: 'diana',
      hash: hashedPassword,
      isWriter: true, // Diana is our second writer
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

  const edward = await prisma.user.create({
    data: {
      username: 'edward',
      hash: hashedPassword,
      isWriter: false,
    },
  });

  const fiona = await prisma.user.create({
    data: {
      username: 'fiona',
      hash: hashedPassword,
      isWriter: false,
    },
  });

  console.log(`Created 6 users: ${alice.username} (Writer), ${diana.username} (Writer), ${bob.username}, ${charlie.username}, ${edward.username}, ${fiona.username}`);

  // --- 3. Create Blog Posts ---
  console.log('Creating blog posts...');
  
  // Alice's Posts
  const blog1 = await prisma.blog.create({
    data: {
      title: 'My Journey with Prisma',
      body: "Welcome to my new blog! This is my first post, where I'll be talking about my experience setting up this API. Prisma makes database interactions so intuitive. It's been a breeze to set up the schema and relations.",
      published: true,
      authorId: alice.id,
    },
  });

  const blog2 = await prisma.blog.create({
    data: {
      title: 'Thoughts on React (Draft)',
      body: 'Just a quick draft about React. I find hooks to be a powerful feature, but they come with their own learning curve. State management with Context has been interesting to explore. More on this later...',
      published: false, // This one is a draft
      authorId: alice.id,
    },
  });

  const blog3 = await prisma.blog.create({
    data: {
      title: 'Securing a Node.js API',
      body: "Today let's talk about security. It's a critical piece of any application. We implemented JWTs (JSON Web Tokens) using Passport.js, which provides a stateless authentication strategy. This means our server doesn't need to store session information. We also use bcrypt to hash passwords, which is a must-do. Never store passwords in plain text!",
      published: true,
      authorId: alice.id,
    },
  });

  // Diana's Posts
  const blog4 = await prisma.blog.create({
    data: {
      title: 'Vietnam Travel Guide: Hanoi',
      body: 'Just got back from an amazing trip to Hanoi! The food is incredible, especially the Pho and Banh Mi. The Old Quarter is chaotic and beautiful. Highly recommend a visit if you get the chance. The egg coffee is a must-try!',
      published: true,
      authorId: diana.id,
    },
  });

  const blog5 = await prisma.blog.create({
    data: {
      title: 'My Top 5 Favorite Cafes in HCMC',
      body: "As a dev, I need my coffee. Here are my top 5 spots in Ho Chi Minh City for a great brew and a place to get some work done. \n1. The Workshop\n2. La Viet\n3. ... (will add more later)",
      published: true,
      authorId: diana.id,
    },
  });

  const blog6 = await prisma.blog.create({
    data: {
      title: 'Meeting Notes (Private Draft)',
      body: 'Private draft for project ideas. \n- Implement new auth features\n- Look into pagination for the API',
      published: false, // This is a draft
      authorId: diana.id,
    },
  });

  const blog7 = await prisma.blog.create({
    data: {
      title: 'A Post With No Comments',
      body: 'I wonder if anyone will read this? This post is here to test the UI when a blog post has zero comments. It feels a bit lonely here, but it is important for testing!',
      published: true,
      authorId: alice.id,
    },
  });

  console.log(`Created ${await prisma.blog.count()} blogs (4 published, 3 drafts).`);

  // --- 4. Create Comments ---
  console.log('Creating comments...');

  // Comments for Blog 1 (Prisma)
  await prisma.comment.create({ data: { body: 'Great first post, Alice! Looking forward to reading more.', userId: bob.id, blogId: blog1.id } });
  await prisma.comment.create({ data: { body: 'I agree, Prisma is fantastic. Did you have any trouble with the relations?', userId: charlie.id, blogId: blog1.id } });
  await prisma.comment.create({ data: { body: 'Thanks, Bob! And to @charlie: The relations were tricky at first, especially with `onDelete: Cascade`, but the documentation is excellent. Glad you are enjoying the blog!', userId: alice.id, blogId: blog1.id } });
  await prisma.comment.create({ data: { body: 'I just started using Prisma, this is helpful.', userId: edward.id, blogId: blog1.id } });
  await prisma.comment.create({ data: { body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', userId: fiona.id, blogId: blog1.id } });
  await prisma.comment.create({ data: { body: 'Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec euismod, nisl eget.', userId: bob.id, blogId: blog1.id } });
  await prisma.comment.create({ data: { body: 'This post will be great for testing pagination!', userId: charlie.id, blogId: blog1.id } });
  await prisma.comment.create({ data: { body: 'Another comment just to add to the list.', userId: edward.id, blogId: blog1.id } });

  // Comments for Blog 3 (Security)
  await prisma.comment.create({ data: { body: 'Super useful info on JWTs, thanks!', userId: diana.id, blogId: blog3.id } });
  await prisma.comment.create({ data: { body: 'What about refresh tokens? I have heard they are important.', userId: bob.id, blogId: blog3.id } });
  await prisma.comment.create({ data: { body: 'Good question, @bob. Refresh tokens are a more advanced strategy, maybe for a future post! They help keep a user logged in for longer without compromising the short-lived access token.', userId: alice.id, blogId: blog3.id } });

  // Comments for Blog 4 (Hanoi)
  await prisma.comment.create({ data: { body: 'I love Hanoi! Did you try the egg coffee?', userId: fiona.id, blogId: blog4.id } });
  await prisma.comment.create({ data: { body: 'I did! It was... interesting. Very sweet, but surprisingly good!', userId: diana.id, blogId: blog4.id } });
  await prisma.comment.create({ data: { body: 'Adding this to my travel list. Thanks, Diana!', userId: charlie.id, blogId: blog4.id } });
  await prisma.comment.create({ data: { body: 'Banh Mi is the best!', userId: bob.id, blogId: blog4.id } });
  
  // Comments for Blog 5 (Cafes)
  await prisma.comment.create({ data: { body: 'Which cafe is your #1? Don\'t leave us hanging!', userId: alice.id, blogId: blog5.id } });
  await prisma.comment.create({ data: { body: 'Yes, please share the full list!', userId: fiona.id, blogId: blog5.id } });

  // No comments for Blog 2 (draft), Blog 6 (draft), or Blog 7 (empty post)

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

