const router = require("express").Router();
// const courseController = require("../../app/controller/courseController");
// const unitController = require("../../app/controller/unitController");
// const lessonController = require("../../app/controller/lessonController");
// const clientController = require("../../app/controller/clientController");
// const middleware = require("../../app/middleware/courseMiddleware");
// const clientMiddleware = require("../../app/middleware/clientMiddleware");
// const authen = require("../../app/middleware/authentication");
const middleware = require("../../app/middleware/middleware");
const courseController = require("../../app/controller/course");

// SERVER
    // LESSON
        // router.get("/unit/lesson", )

    // UNIT
        router.get("/unit", middleware.unitTransactions, courseController.functionsUnit);

    // COURSE
        router.get("/course", middleware.courseTransaction, courseController.functionsCourse);
        router.post("/course", middleware.courseTransaction, courseController.functionsCourse);
        router.put("/course", middleware.courseTransaction, courseController.functionsCourse);
        router.delete("/course", middleware.courseTransaction, courseController.functionsCourse);

        // router.get("/course", courseController.course);
        // router.post("/course-single", authen.authentication, middleware.courseMapper, courseController.findSingle);
        // router.post("/course-new", authen.authentication, authen.permissions, middleware.courseMapper, courseController.newCourse);
        // router.put("/course-edit", authen.authentication, authen.permissions, middleware.courseMapper, courseController.editCourse);
        // router.delete("/course-remove", authen.authentication, authen.permissions, middleware.courseAcceptRemove, middleware.courseMapper, courseController.removeCourse);

    // UNIT
        // router.get("/unit", unitController.unit);
        // router.post("/unit-single", authen.authentication, middleware.unitMapper, unitController.findSingleUnit);
        // router.post("/unit-new", authen.authentication, authen.permissions, middleware.unitMapper, unitController.newUnit);
        // router.put("/unit-edit", authen.authentication, authen.permissions, middleware.unitMapper, unitController.editUnit);
        // router.delete("/unit-remove", authen.authentication, authen.permissions, middleware.unitAcceptRemove, middleware.unitMapper, unitController.removeUnit);

    // LESSON
        // router.get("/lesson", lessonController.lesson);
        // router.post("/lesson-single", authen.authentication, middleware.lessonMapper, lessonController.findSingleLessson);
        // router.post("/lesson-new", authen.authentication, authen.permissions, middleware.lessonMapper, lessonController.newLesson);
        // router.put("/lesson-edit", authen.authentication, authen.permissions, middleware.lessonMapper, lessonController.editLesson);
        // router.delete("/lesson-remove", authen.authentication, authen.permissions, middleware.lessonMapper, lessonController.removeLesson);

    // CLIENT
        // router.post("/course-detail", clientMiddleware.courseDetail, clientMiddleware.courseLesson, clientController.getCourse);

module.exports = router;
