import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const CATEGORIES = [
  { id: 'webdev', names: ['React', 'Node.js', 'Next.js', 'Vue', 'CSS', 'HTML', 'TypeScript', 'Python'] },
  { id: 'design', names: ['Figma', 'UI Design', 'UX Research', 'Logo Design', 'Illustration'] },
  { id: 'music', names: ['Piano', 'Guitar', 'Vocals', 'Music Production', 'Songwriting'] },
  { id: 'language', names: ['Spanish', 'French', 'Japanese', 'English', 'Mandarin'] },
  { id: 'speaking', names: ['Public Speaking', 'Debate', 'Podcasting', 'Voice Acting'] },
  { id: 'ai', names: ['Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science', 'LLMs'] },
  { id: 'photo', names: ['Portrait Photo', 'Landscape', 'Photo Editing', 'Videography'] },
  { id: 'fitness', names: ['Personal Training', 'Yoga', 'HIIT', 'Weightlifting'] },
  { id: 'cooking', names: ['Italian Cuisine', 'Baking', 'Healthy Meals', 'Vegan Cooking'] },
];

const LEVELS = ['Advance', 'Pro', 'Intermediate', 'Rookie', 'Noob'];
const COLORS = ['#5865F2', '#EC4899', '#22C55E', '#00F5FF', '#F59E0B', '#8B5CF6', '#EF4444', '#F97316'];

const FIRST_NAMES = ['Alex', 'Sam', 'Jordan', 'Casey', 'Taylor', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Skyler', 'Cameron', 'Drew', 'Jesse', 'Kendall', 'Logan', 'Micah', 'Peyton', 'Reese', 'Rowan', 'Spencer'];
const LAST_INITIALS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W'];

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomItem(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('Clearing old data...');
  await prisma.swapRequest.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  console.log('Generating 50 random users...');

  let count = 0;
  for (let i = 0; i < 50; i++) {
    const firstName = randomItem(FIRST_NAMES);
    const lastInitial = randomItem(LAST_INITIALS);
    const haveCategory = randomItem(CATEGORIES);
    const wantCategory = randomItem(CATEGORIES);

    await prisma.user.create({
      data: {
        username: `${firstName}_${lastInitial}_${i}`,
        email: `user${i}@example.com`,
        name: `${firstName} ${lastInitial}.`,
        avatarColor: randomItem(COLORS),
        rating: Math.round(randomRange(4.0, 5.0) * 10) / 10,
        level: randomItem(LEVELS),
        hoursExchanged: Math.floor(randomRange(0, 50)),
        totalSwaps: Math.floor(randomRange(0, 30)),
        isOnline: Math.random() > 0.5,
        skills: {
          create: [
            { name: randomItem(haveCategory.names), category: haveCategory.id, type: 'have' },
            { name: randomItem(wantCategory.names), category: wantCategory.id, type: 'want' }
          ]
        }
      }
    });
    count++;
  }

  console.log(`Seeding complete! Added ${count} varied mock users.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
