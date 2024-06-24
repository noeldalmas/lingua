const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// Service to create a new lesson
const createLesson = async (lessonData) => {
  const course = await Course.findById(lessonData.course);
  if (!course) {
    return { error: "Course not found" };
  }

  const lesson = new Lesson(lessonData);
  await lesson.save();

  course.lessons.push(lesson._id);
  await course.save();

  return { data: lesson };
};

// Service to get all lessons
const getAllLessons = async () => {
  return Lesson.find({});
};

// Service to get lessons by course ID
const getLessonsByCourseId = async (courseId) => {
  const lessons = await Lesson.find({ course: courseId });
  return { data: lessons };
};

// Service to get a lesson by ID
const getLessonById = async (lessonId) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return { error: "Lesson not found" };
  }
  return { data: lesson };
};

// Service to update a lesson
const updateLesson = async (lessonId, lessonData) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return { error: "Lesson not found" };
  }

  const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, lessonData, {
    new: true,
  });
  return { data: updatedLesson };
};

// Service to delete a lesson
const deleteLesson = async (lessonId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const lesson = await Lesson.findById(lessonId).session(session);
    if (!lesson) {
      await session.abortTransaction();
      session.endSession();
      return { error: "Lesson not found" };
    }

    await Lesson.findByIdAndDelete(lessonId).session(session);

    const course = await Course.findById(lesson.course).session(session);
    if (course) {
      course.lessons.pull(lesson._id);
      await course.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    return { data: lesson };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; // Or return an error object/message
  }
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonsByCourseId,
  updateLesson,
  deleteLesson,
  getLessonById,
};
