const router = require("express").Router();
const courseController = require("../../app/controller/courseController");
const unitController = require("../../app/controller/unitController");
const lessonController = require("../../app/controller/lessonController");
const middleware = require("../../app/middleware/courseMiddleware");
const authen = require("../../app/middleware/authentication");

// COURSE
router.get("/course", authen.authentication, courseController.course);
router.post("/course-single", authen.authentication, middleware.courseMapper, courseController.findSingle);
router.post("/course-new", authen.authentication, authen.permissions, middleware.courseMapper, courseController.newCourse);
router.put("/course-edit", authen.authentication, authen.permissions, middleware.courseMapper, courseController.editCourse);
router.delete("/course-remove", authen.authentication, authen.permissions, middleware.courseAcceptRemove, middleware.courseMapper, courseController.removeCourse);

// UNIT
router.get("/unit", authen.authentication, middleware.unitMapper, unitController.unit);
router.post("/unit-single", authen.authentication, middleware.unitMapper, unitController.findSingleUnit);
router.post("/unit-new", authen.authentication, authen.permissions, middleware.unitMapper, unitController.newUnit);
router.put("/unit-edit", authen.authentication, authen.permissions, middleware.unitMapper, unitController.editUnit);
router.delete("/unit-remove", authen.authentication, authen.permissions, middleware.unitAcceptRemove, middleware.unitMapper, unitController.removeUnit);

// LESSON
router.get("/lesson-home", middleware.converPageLesson, lessonController.pageLesson);
router.post("/lesson-single", middleware.converQueryLesson, lessonController.findSingleLessson);
router.post("/lesson-new", middleware.converLesson, lessonController.newLesson);
router.put("/lesson-edit", middleware.converLesson, lessonController.editLesson);
router.delete("/lesson-remove", middleware.converQueryLesson, lessonController.removeLesson);

module.exports = router;
