
// seed_final_relevant.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

import User from '../models/user.model.js';
import Company from '../models/company.model.js';
import Job from '../models/job.model.js';
import Application from '../models/application.model.js';
import Blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';

dotenv.config();
faker.locale = 'en';

const MONGOURI="mongodb+srv://testDB:testDB@cluster0.y9z901n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGOURI).then(() => {
    console.log("MongoDB connected");
    seedAll();
}).catch(err => console.error(err));

const NUM_DOCS = 5000;
const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "Docker",
    "TypeScript",
    "Python",
    "AWS",
    "Kubernetes",
    "PostgreSQL",
    "GraphQL",
    "Next.js",
    "Express.js",
    "Redis",
    "Tailwind CSS",
    "Jenkins",
    "Java",
    "Spring Boot",
    "C++",
    "Flask",
    "Django",
    "TensorFlow",
    "PyTorch",
    "GCP",
    "Azure",
    "Svelte",
    "Git",
    "CI/CD",
    "REST API"
];
const blogTitles = [
    "How to Crack a Full-Stack Developer Interview",
    "Top 10 Resume Tips for Tech Jobs",
    "React vs. Vue: Which Should You Learn in 2025?",
    "Understanding Docker and Kubernetes for Beginners",
    "The Roadmap to Becoming a Backend Developer",
    "How to Build Your First Full-Stack App",
    "DevOps for Developers: A Quick Start Guide",
    "Top Mistakes Candidates Make in Coding Interviews",
    "Preparing for System Design Interviews in 2025",
    "From Intern to Engineer: My Journey in a Startup"
];
const commentSamples = [
    "Great article!",
    "This was very helpful, thanks!",
    "I was looking for this topic!",
    "Nice insights. Keep it up!",
    "Super useful tips for job seekers.",
    "Thanks for breaking it down so well!",
    "I’ll share this with my friends.",
    "One of the best reads today!",
    "This helped me prep for my interview.",
    "Loved the writing style!"
];

const companyNames = [
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Meta",
    "Netflix",
    "Adobe",
    "Intel",
    "IBM",
    "Oracle",
    "Salesforce",
    "SAP",
    "Uber",
    "Airbnb",
    "Twitter",
    "LinkedIn",
    "Zoom",
    "Spotify",
    "Dropbox",
    "Red Hat",
    "NVIDIA",
    "Cisco",
    "Qualcomm",
    "VMware",
    "PayPal",
    "Stripe",
    "Square",
    "Atlassian",
    "Shopify",
    "Twilio",
    "Slack",
    "Pinterest",
    "GitHub",
    "Trello",
    "Bitbucket",
    "Asana",
    "Notion",
    "Figma",
    "Canva",
    "TikTok",
    "Snapchat",
    "Alibaba",
    "Tencent",
    "Baidu",
    "Xiaomi",
    "Huawei",
    "Dell",
    "HP",
    "Lenovo",
    "Samsung",
    "Zoho",
    "Freshworks",
    "TCS",
    "Infosys",
    "Wipro",
    "HCLTech",
    "Mindtree",
    "Capgemini",
    "Cognizant",
    "Tech Mahindra",
    "ZScaler",
    "CrowdStrike",
    "Cloudflare",
    "Datadog",
    "Snowflake",
    "Palantir",
    "Splunk",
    "Elastic",
    "HashiCorp",
    "DigitalOcean",
    "MongoDB",
    "Cloudera",
    "Confluent",
    "Nutanix",
    "AppDynamics",
    "New Relic",
    "Snyk",
    "Miro",
    "Monday.com",
    "Jira",
    "JetBrains",
    "Turing",
    "CoderPad",
    "CodinGame",
    "LeetCode",
    "HackerRank",
    "Codeforces",
    "GeeksforGeeks",
    "Coursera",
    "Udemy",
    "EdX",
    "Khan Academy",
    "OpenAI",
    "DeepMind",
    "Hugging Face",
    "Anthropic",
    "Replit",
    "Vercel",
    "Netlify",
    "Heroku"
];

let users = [], companies = [], jobs = [], blogs = [];

async function clearDatabase() {
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});
    await Blog.deleteMany({});
    await Comment.deleteMany({});
}

async function seedUsers() {
    console.log("Seeding users...");
    const roles = ['student', 'recruiter', 'superUser'];
    const userDocs = [];
    const emailSet = new Set();
    const phoneSet = new Set();
    while (userDocs.length < NUM_DOCS) {
        const email = faker.internet.email();
        const phone = faker.string.numeric({ length: 10 });
        if (emailSet.has(email) || phoneSet.has(phone)) continue;
        emailSet.add(email);
        phoneSet.add(phone);
        userDocs.push({
            fullname: faker.person.fullName(),
            email,
            phoneNumber: Number(phone),
            password: "hashed_password",
            role: faker.helpers.arrayElement(roles),
            profile: {
                bio: faker.lorem.sentence(),
                skills: faker.helpers.arrayElements(skills, 4),
                resume: faker.internet.url(),
                resumeOriginalName: "resume.pdf",
                profilePhoto: faker.image.avatar()
            }
        });
    }
    users = await User.insertMany(userDocs);
}

async function seedCompanies() {
    console.log("Seeding companies...");
    const recruiters = users.filter(u => u.role === 'recruiter');
    const companyDocs = [];
    const usedNames = new Set();
    for (let i = 0; i < NUM_DOCS; i++) {
        let name = companyNames[i % companyNames.length] + (i >= companyNames.length ? ' ' + (i - companyNames.length + 1) : '');
        if (usedNames.has(name)) continue;
        usedNames.add(name);
        const recruiter = faker.helpers.arrayElement(recruiters);
        companyDocs.push({
            name,
            description: faker.company.catchPhrase(),
            website: faker.internet.url(),
            location: faker.location.city(),
            logo: faker.image.url(),
            userId: recruiter._id
        });
    }
    companies = await Company.insertMany(companyDocs);
}

async function seedJobs() {
    console.log("Seeding jobs...");
    const jobDocs = [];
    const recruiters = users.filter(u => u.role === 'recruiter');
    for (let i = 0; i < NUM_DOCS; i++) {
        const recruiter = faker.helpers.arrayElement(recruiters);
        const company = faker.helpers.arrayElement(companies);
        jobDocs.push({
            title: faker.helpers.arrayElement(["Frontend Developer", "Backend Developer", "DevOps Engineer", "Full-Stack Developer", "Data Scientist", "Machine Learning Engineer", "React Developer", "Node.js Developer"]) + " #" + i,
            description: faker.lorem.paragraph(),
            requirements: faker.helpers.arrayElements(skills, 5),
            salary: faker.finance.amount(6, 20, 1) + " LPA",
            experienceLevel: faker.number.int({ min: 0, max: 5 }),
            location: faker.location.city(),
            jobType: faker.helpers.arrayElement(['Full-time', 'Part-time', 'Internship']),
            position: faker.number.int({ min: 1, max: 10 }),
            company: company._id,
            created_by: recruiter._id,
            applications: []
        });
    }
    jobs = await Job.insertMany(jobDocs);
}

async function seedApplications() {
    console.log("Seeding applications...");
    const students = users.filter(u => u.role === 'student');
    const appDocs = [];
    for (let i = 0; i < NUM_DOCS; i++) {
        const student = faker.helpers.arrayElement(students);
        const job = faker.helpers.arrayElement(jobs);
        appDocs.push({
            job: job._id,
            applicant: student._id,
            status: faker.helpers.arrayElement(['pending', 'accepted', 'rejected'])
        });
    }
    await Application.insertMany(appDocs);
}

async function seedBlogs() {
    console.log("Seeding blogs...");
    const blogDocs = [];
    for (let i = 0; i < NUM_DOCS; i++) {
        const user = faker.helpers.arrayElement(users);
        const title = blogTitles[i % blogTitles.length] + " - Post #" + i;
        blogDocs.push({
            title,
            content: faker.lorem.paragraphs(3),
            author: user._id,
            tags: faker.helpers.arrayElements(skills, 3),
            image: faker.image.url()
        });
    }
    blogs = await Blog.insertMany(blogDocs);
}

async function seedComments() {
    console.log("Seeding comments...");
    const commentDocs = [];
    for (let i = 0; i < NUM_DOCS; i++) {
        const user = faker.helpers.arrayElement(users);
        const blog = faker.helpers.arrayElement(blogs);
        const content = faker.helpers.arrayElement(commentSamples);
        commentDocs.push({
            content,
            author: user._id,
            blog: blog._id
        });
    }
    await Comment.insertMany(commentDocs);
}

async function seedAll() {
    await clearDatabase();
    await seedUsers();
    await seedCompanies();
    await seedJobs();
    await seedApplications();
    await seedBlogs();
    await seedComments();
    console.log("Seeding Complete with Realistic Data");
    process.exit();
}
