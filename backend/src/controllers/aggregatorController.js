const AggregatorService = require("../services/aggregatorService");

const createAggregatedContent = async (req, res, next) => {
  const { language } = req.body;

  try {
    const videos = await AggregatorService.fetchYouTubeData(language);
    for (const video of videos) {
      await AggregatorService.enrichVideoWithKeyPhrases(video);
    }
    await AggregatorService.saveToMongoDB(videos);
    const savedVideos = await AggregatorService.getAggregatedContent();
    res.status(200).send({
      message: "Content fetched, enriched, and saved successfully",
      data: savedVideos,
    });
  } catch (error) {
    next(error);
  }
};

const getAggregatedContent = async (req, res, next) => {
  try {
    const content = await AggregatorService.getAggregatedContent();
    res.status(200).send(content);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAggregatedContent, getAggregatedContent };
