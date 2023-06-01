import typeorm from 'typeorm';

const Review = new typeorm.EntitySchema({
  name: 'Review',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    author: {
      type: String,
      unique: true,
    },
    author_username: { type: String },
    author_rating: { type: Number },
    content: { type: String },
    media_title: { type: String },
    media_id: { type: Number },
  },
});

export default Review;
