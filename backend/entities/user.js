import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    nickname: {
      type: String,
      unique: true,
    },
    birthday: { type: String },
    gender: { type: Number },
    bio: { type: String },
  },
});

export default User;
