This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Initializing the DB


Initializing the Database Now
We are Using MYSQL for this Project

In order that this Project run on Your Computer do the Following things Make a MySQL Server and Initialize a Database on MySQL and Initialize 3 Tables and Run the following


CREATE TABLE students (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255),
    registration_number VARCHAR(50),
    profile_picture BLOB
);

CREATE TABLE teachers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255),
    TeacherCode VARCHAR(50),
    profile_picture BLOB
);

CREATE TABLE testattempts (
    student_id VARCHAR(255) NOT NULL,
    teacher_id VARCHAR(255) NOT NULL,
    test_attempt TINYINT(1),
    result INT,
    test_name VARCHAR(255) NOT NULL PRIMARY KEY
);


## Changing mysql.ts
At the Location @/app/lib there is a mysql.ts file change the server and other attributes according to You.

## Initialize a .env File (Environment Variable File)
Which has this line
You can change the hashing or secret key according to you also.

JWT_SECRET= XyZ4ds8^QeT9!asZ&pJp_3Lm$1KiNbxR$5@tUv11
