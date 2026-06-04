const mongoose =
  require("mongoose");

const bookSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },

      author: {
        type: String,
        required: true
      },

      genre: {
        type: String,
        required: true
      },

      description: {
        type: String,
        default: ""
      },

      coverImage: {
        type: String,
        default: ""
      },

      totalPages: {
        type: Number,
        required: true
      },

      currentPage: {
        type: Number,
        default: 0
      },

      readingStatus: {
        type: String,
        enum: [
          "Want To Read",
          "Currently Reading",
          "Next To Read",
          "Completed"
        ],
        default:
          "Want To Read"
      },

      rating: {
        type: Number,
        default: 0
      },

      notes: [
        {
          page: Number,
          content: String,
          createdAt: {
            type: Date,
            default: Date.now
          }
        }
      ],

      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "Book",
    bookSchema
  );