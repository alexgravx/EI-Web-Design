import typeorm from 'typeorm';

const Review = new typeorm.EntitySchema({
  name: 'Review',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    user_id: { type: Number },
    rating: { type: Number },
    movie_title: { type: String },
    movie_id: { type: Number },
  },
});

export default Review;
