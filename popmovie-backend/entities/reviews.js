import typeorm from 'typeorm';

const Review = new typeorm.EntitySchema({
  name: 'Review',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    rating: { type: Number },
    media_title: { type: String },
    media_id: { type: Number },
  },
});

export default Review;
