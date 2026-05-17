import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Aishwarya Tomer',
      tagline: 'Software Engineer & Open Source Contributor',
      email: 'aishwaryatomer@gmail.com',
      phone: '+91 6388286176',
      linkedinUrl: 'https://linkedin.com/in/aishtomer',
      githubUrl: 'https://github.com/aishtomer',
      githubUsername: 'aishtomer',
      leetcodeUsername: 'aishtomer',
    },
  })

  // Add Education
  await prisma.education.create({
    data: {
      institution: 'Goldsmiths, University of London',
      location: 'London, UK',
      degree: 'Bachelor of Science (Hons.), Computer Science',
      startDate: 'Sep 2023',
      endDate: 'Aug 2024',
      highlights: JSON.stringify([
        'Classification: Upper Second Class Honours (2:1)',
        'Selected Coursework: Machine Learning (83% - Distinction), Data Mining, Game AI, Databases.'
      ]),
      order: 1
    }
  })

  await prisma.education.create({
    data: {
      institution: 'University of London (Worldwide)',
      location: 'Remote / Online',
      degree: 'Bachelor of Science, Computer Science (Years 1 & 2)',
      startDate: 'Oct 2021',
      endDate: 'Aug 2023',
      highlights: JSON.stringify([
        'Completed 240 credits (Level 4 & 5) via distance learning before transferring to Goldsmiths for final year.',
        'Coursework: Data Structures & Algorithms, Discrete Mathematics, Agile Software Projects, Computer Security.'
      ]),
      order: 2
    }
  })

  // Add Experience
  await prisma.experience.create({
    data: {
      company: 'Independent Researcher',
      location: 'Remote',
      role: 'Open Source Contributor',
      startDate: 'Oct 2024',
      endDate: 'Present',
      highlights: JSON.stringify([
        'Cloud & Generative AI Foundations: Completed Google Cloud\'s Introduction to Generative AI Learning Path (Sep 2025) covering LLM architectures and Responsible AI.',
        'Enterprise Software Practices: Completed The Linux Foundation\'s Open Source Software Development Methods (Aug 2025).',
        'Algorithmic Problem Solving: Solved 500+ LeetCode problems focused on advanced data structures, achieving a Top 3.7% global rank.'
      ]),
      order: 1
    }
  })

  await prisma.experience.create({
    data: {
      company: 'Samsara',
      location: 'London, UK',
      role: 'Software Engineering Intern (Backend)',
      startDate: 'Jun 2024',
      endDate: 'Sep 2024',
      highlights: JSON.stringify([
        'Engineered the "Global Speed Limit Overrides" system to address inaccurate third-party map data, reducing false-positive speeding alerts by a projected 40%.',
        'Designed and implemented a consensus algorithm by analyzing a dataset of 5,000+ road samples against the Google Maps API.',
        'Developed a high-performance concurrent polling worker in Go and designed an optimized SQL schema to ingest high-volume override data.'
      ]),
      order: 2
    }
  })

  // Add Projects
  await prisma.project.create({
    data: {
      title: 'Thermographic Fever Detection & Temperature Prediction',
      techStack: 'Python, Scikit-learn',
      highlights: JSON.stringify([
        'Developed a custom ML pipeline to predict oral temperatures and classify fever instances using infrared thermographic sensor data of 1,000+ subjects, achieving a classification accuracy exceeding 95%.',
        'Engineered robust spatial representations using K-Means clustering to capture nonlinear spatial thermal distributions.',
        'Optimized model hyperparameter tuning via RandomizedSearchCV to ensure robust generalization across varying thermal profiles.'
      ]),
      order: 1
    }
  })

  await prisma.project.create({
    data: {
      title: 'Autonomous Tetris Agent (AI & Heuristic Optimization)',
      techStack: 'C#, Genetic Algorithms',
      highlights: JSON.stringify([
        'Built an autonomous AI agent capable of clearing an average of 682 lines per game by implementing a linear evaluation function based on six weighted board-state factors.',
        'Utilized a Genetic Algorithm to optimize decision-making, training the model over multiple generations to converge on an ideal set of weights.',
        'Conducted ablation studies across diverse scenarios to refine decision-making and prevent local optima convergence.'
      ]),
      order: 2
    }
  })

  // Add Skills
  await prisma.skillCategory.create({
    data: {
      name: 'Languages',
      skills: 'Python, Go (Golang), C-sharp, JavaScript, SQL, Java',
      order: 1
    }
  })

  await prisma.skillCategory.create({
    data: {
      name: 'Foundations',
      skills: 'Data Structures, Algorithms, Distributed Systems, Operating Systems, OOP',
      order: 2
    }
  })
  
  await prisma.skillCategory.create({
    data: {
      name: 'ML/Data & Tools',
      skills: 'Scikit-learn, Pandas, NumPy, Jupyter, Git, Linux, GitHub, Unity Game Engine',
      order: 3
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
