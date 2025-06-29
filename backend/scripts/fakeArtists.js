require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user'); // đường dẫn model User của bạn

const connect = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log('✅ Connected to MongoDB');
};

const createFakeArtists = async () => {
  await connect();

  const fakeArtists = [
    {
      username: 'artist1',
      email: 'artist1@example.com',
      password: 'password123',
      role: 'artist',
      authProvider: 'email',
    },
    {
      username: 'artist2',
      email: 'artist2@example.com',
      password: 'password123',
      role: 'artist',
      authProvider: 'email',
    },
    {
      username: 'artist3',
      email: 'artist3@example.com',
      password: 'password123',
      role: 'artist',
      authProvider: 'email',
    },
  ];

  for (const data of fakeArtists) {
    const exists = await User.findOne({ email: data.email });
    if (!exists) {
      await User.create(data);
      console.log(`✅ Created artist: ${data.username}`);
    } else {
      console.log(`ℹ️  Artist already exists: ${data.username}`);
    }
  }

  mongoose.disconnect();
};

createFakeArtists();
