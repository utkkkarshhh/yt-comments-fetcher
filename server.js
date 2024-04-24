const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { google } = require("googleapis");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

dotenv.config();

const youtube = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});

async function fetchComments(videoId) {
  let allComments = [];
  let nextPageToken = null;
  try {
    do {
      const response = await youtube.commentThreads.list({
        part: "snippet",
        videoId: videoId,
        maxResults: 100,
        pageToken: nextPageToken,
      });

      const comments = await Promise.all(
        response.data.items.map(async (item) => {
          const topLevelComment = item.snippet.topLevelComment;
          const comment = {
            author: topLevelComment.snippet.authorDisplayName,
            text: topLevelComment.snippet.textOriginal,
            profilePicture: await fetchAuthorProfilePicture(
              topLevelComment.snippet.authorChannelId.value
            ),
            replies: [],
          };

          // Fetch replies for this top-level comment
          const replies = await fetchReplies(item.id);
          comment.replies = replies;

          return comment;
        })
      );
      allComments = allComments.concat(comments);
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    return allComments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

async function fetchReplies(threadId) {
  try {
    const response = await youtube.comments.list({
      part: "snippet",
      parentId: threadId,
      maxResults: 100,
    });

    const replies = response.data.items.map((reply) => ({
      author: reply.snippet.authorDisplayName,
      text: reply.snippet.textOriginal,
      profilePicture: fetchAuthorProfilePicture(
        reply.snippet.authorChannelId.value
      ),
    }));

    return replies;
  } catch (error) {
    console.error("Error fetching replies:", error);
    return [];
  }
}

async function fetchAuthorProfilePicture(channelId) {
  try {
    const response = await youtube.channels.list({
      part: "snippet",
      id: channelId,
    });

    const profilePictureUrl =
      response.data.items[0].snippet.thumbnails.default.url;
    return profilePictureUrl;
  } catch (error) {
    console.error("Error fetching author profile picture:", error);
    return null;
  }
}

app.get("/", async (req, res) => {
  try {
    const videoId = "BfdGBBSQ2fU";
    const comments = await fetchComments(videoId);
    const numberOfComments = comments.length;
    console.log(comments);
    res.render("index.ejs", { comments: comments, numberOfComments: numberOfComments});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error fetching comments");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
