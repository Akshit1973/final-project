import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding real project data...');

  // Clean up existing data to avoid conflicts during debugging
  await prisma.skill.deleteMany({});
  await prisma.swapRequest.deleteMany({});
  await prisma.user.deleteMany({});

  const users = [
    { 
      username: 'priya_ux', 
      email: 'priya@example.com', 
      level: 'Advance', 
      color: '#EC4899',
      rating: 4.9,
      totalSwaps: 34,
      hours: 73,
      skills: [
        { name: 'UI/UX Design', type: 'have', category: 'design' },
        { name: 'Figma', type: 'have', category: 'design' },
        { name: 'React', type: 'want', category: 'webdev' }
      ]
    },
    { 
      username: 'rahul_piano', 
      email: 'rahul@example.com', 
      level: 'Pro', 
      color: '#22C55E',
      rating: 4.8,
      totalSwaps: 21,
      hours: 45,
      skills: [
        { name: 'Classical Piano', type: 'have', category: 'music' },
        { name: 'Music Theory', type: 'have', category: 'music' },
        { name: 'Node.js', type: 'want', category: 'webdev' }
      ]
    },
    { 
      username: 'arjun_code', 
      email: 'arjun@example.com', 
      level: 'Rookie', 
      color: '#5865F2',
      rating: 5.0,
      totalSwaps: 12,
      hours: 28,
      skills: [
        { name: 'React & Next.js', type: 'have', category: 'webdev' },
        { name: 'TypeScript', type: 'have', category: 'webdev' },
        { name: 'UI Design', type: 'want', category: 'design' }
      ]
    },
    { 
      username: 'sneha_esp', 
      email: 'sneha@example.com', 
      level: 'Intermediate', 
      color: '#00F5FF',
      rating: 4.7,
      totalSwaps: 42,
      hours: 89,
      skills: [
        { name: 'Spanish Fluency', type: 'have', category: 'language' },
        { name: 'Public Speaking', type: 'have', category: 'speaking' },
        { name: 'Photography', type: 'want', category: 'photo' }
      ]
    },
    { 
      username: 'leo_cooks', 
      email: 'leo@example.com', 
      level: 'Pro', 
      color: '#84CC16',
      rating: 4.6,
      totalSwaps: 15,
      hours: 30,
      skills: [
        { name: 'French Cuisine', type: 'have', category: 'cooking' },
        { name: 'Plating Techniques', type: 'have', category: 'cooking' },
        { name: 'Italian Basics', type: 'want', category: 'cooking' }
      ]
    },
    { 
      username: 'maya_fit', 
      email: 'maya@example.com', 
      level: 'Advance', 
      color: '#EF4444',
      rating: 4.9,
      totalSwaps: 58,
      hours: 120,
      skills: [
        { name: 'Yoga Vinyasa', type: 'have', category: 'fitness' },
        { name: 'Meditation', type: 'have', category: 'fitness' },
        { name: 'Nutrition', type: 'want', category: 'fitness' }
      ]
    },
    { 
      username: 'sam_ai', 
      email: 'sam@example.com', 
      level: 'Pro', 
      color: '#8B5CF6',
      rating: 4.8,
      totalSwaps: 27,
      hours: 65,
      skills: [
        { name: 'Machine Learning', type: 'have', category: 'ai' },
        { name: 'Python Data Sci', type: 'have', category: 'ai' },
        { name: 'Deep Learning', type: 'want', category: 'ai' }
      ]
    },
    { 
      username: 'zara_lens', 
      email: 'zara@example.com', 
      level: 'Intermediate', 
      color: '#F97316',
      rating: 4.7,
      totalSwaps: 19,
      hours: 42,
      skills: [
        { name: 'Portrait Photo', type: 'have', category: 'photo' },
        { name: 'Lightroom', type: 'have', category: 'photo' },
        { name: 'Video Editing', type: 'want', category: 'design' }
      ]
    }
  ];

  for (const u of users) {
    await prisma.user.create({
      data: {
        username: u.username,
        email: u.email,
        level: u.level,
        avatarColor: u.color,
        rating: u.rating,
        totalSwaps: u.totalSwaps,
        hoursExchanged: u.hours,
        skills: {
          create: u.skills
        }
      }
    });
  }

  console.log('✅ Seed finished! Database is now hackathon-ready.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
