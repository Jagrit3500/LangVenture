require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Path = require('./models/Path');
const Lesson = require('./models/Lesson');

// Seed data for three passion paths
const seedData = [
  {
    path: {
      name: 'Food & Travel',
      slug: 'food-travel',
      description: 'Learn languages through culinary adventures and travel experiences. Master ordering food, reading menus, and conversing with locals.',
      icon: '🍜',
      color: '#F59E0B'
    },
    lessons: [
      {
        title: 'Ordering at Restaurants',
        description: 'Learn essential phrases for dining out, understanding menus, and communicating dietary preferences.',
        order: 1,
        vocabulary: [
          { word: 'menu', translation: 'el menú', example: 'Can I see the menu, please?' },
          { word: 'waiter', translation: 'el camarero', example: 'Excuse me, waiter!' },
          { word: 'bill', translation: 'la cuenta', example: 'Can I have the bill?' }
        ],
        phrases: [
          { phrase: 'I would like to order', translation: 'Me gustaría pedir', context: 'Ordering food' },
          { phrase: 'What do you recommend?', translation: '¿Qué recomiendas?', context: 'Asking for suggestions' }
        ]
      },
      {
        title: 'Navigating Markets & Street Food',
        description: 'Discover how to shop at local markets, bargain for souvenirs, and try authentic street food.',
        order: 2,
        vocabulary: [
          { word: 'market', translation: 'el mercado', example: 'Let\'s go to the market.' },
          { word: 'price', translation: 'el precio', example: 'What is the price?' },
          { word: 'fresh', translation: 'fresco', example: 'This fruit is fresh.' }
        ],
        phrases: [
          { phrase: 'How much does this cost?', translation: '¿Cuánto cuesta esto?', context: 'Shopping' },
          { phrase: 'Is this fresh?', translation: '¿Esto está fresco?', context: 'Buying food' }
        ]
      }
    ]
  },
  {
    path: {
      name: 'Music & Art',
      slug: 'music-art',
      description: 'Immerse yourself in language through music lyrics, art descriptions, and creative expression.',
      icon: '🎨',
      color: '#8B5CF6'
    },
    lessons: [
      {
        title: 'Understanding Song Lyrics',
        description: 'Learn to appreciate and understand music in your target language through popular songs and their meanings.',
        order: 1,
        vocabulary: [
          { word: 'song', translation: 'la canción', example: 'I love this song.' },
          { word: 'artist', translation: 'el artista', example: 'Who is your favorite artist?' },
          { word: 'rhythm', translation: 'el ritmo', example: 'The rhythm is catchy.' }
        ],
        phrases: [
          { phrase: 'What does this song mean?', translation: '¿Qué significa esta canción?', context: 'Discussing music' },
          { phrase: 'I like the melody', translation: 'Me gusta la melodía', context: 'Expressing preference' }
        ]
      }
    ]
  },
  {
    path: {
      name: 'Movies & Media',
      slug: 'movies-media',
      description: 'Learn through films, TV shows, and digital media. Perfect for visual learners who love entertainment.',
      icon: '🎬',
      color: '#EF4444'
    },
    lessons: [
      {
        title: 'Movie Vocabulary & Reviews',
        description: 'Learn to discuss movies, understand film genres, and express your opinions about what you watch.',
        order: 1,
        vocabulary: [
          { word: 'movie', translation: 'la película', example: 'Have you seen that movie?' },
          { word: 'actor', translation: 'el actor', example: 'The actor was amazing.' },
          { word: 'plot', translation: 'la trama', example: 'The plot was confusing.' }
        ],
        phrases: [
          { phrase: 'Have you seen this movie?', translation: '¿Has visto esta película?', context: 'Starting conversation' },
          { phrase: 'The movie was excellent', translation: 'La película fue excelente', context: 'Giving opinion' }
        ]
      },
      {
        title: 'Social Media & Digital Communication',
        description: 'Master modern digital language including social media terms, texting shortcuts, and online etiquette.',
        order: 2,
        vocabulary: [
          { word: 'comment', translation: 'el comentario', example: 'Leave a comment below.' },
          { word: 'share', translation: 'compartir', example: 'Please share this post.' },
          { word: 'like', translation: 'me gusta', example: 'Click like if you agree.' }
        ],
        phrases: [
          { phrase: 'Did you see my post?', translation: '¿Viste mi publicación?', context: 'Social media' },
          { phrase: 'Send me a message', translation: 'Envíame un mensaje', context: 'Digital communication' }
        ]
      }
    ]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Path.deleteMany({});
    await Lesson.deleteMany({});

    // Insert paths and lessons
    console.log('Seeding passion paths and lessons...');
    
    for (const data of seedData) {
      // Create path
      const path = await Path.create(data.path);
      console.log(`✓ Created path: ${path.name}`);

      // Create lessons for this path
      for (const lessonData of data.lessons) {
        const lesson = await Lesson.create({
          ...lessonData,
          path: path._id
        });
        console.log(`  ✓ Created lesson: ${lesson.title}`);
      }
    }

    console.log('\n✅ Database seeded successfully!');
    console.log(`Created ${seedData.length} paths with their lessons.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
