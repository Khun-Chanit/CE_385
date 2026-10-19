// src/routes/students.route.ts — แผนที่ของเส้นทาง
// อ่านไฟล์นี้ไฟล์เดียวต้องตอบได้ว่า มี method + path อะไรบ้าง · ใช้ schema ไหนตรวจ · ส่งต่อให้ controller ตัวไหน
// ไม่มีโค้ดที่ "ทำงาน" อยู่ในไฟล์นี้อีกแล้ว
import { Router } from "express";
import * as studentController from "../controllers/student.controller.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { validate } from "../middlewares/validate.js";
import {
  createStudentSchema,
  listStudentsQuerySchema,
  studentIdParamSchema,
  updateStudentSchema,
} from "../schemas/student.schema.js";

export const studentsRouter = Router();

// การเชื่อมต่อ: Router รับ request แล้วส่งให้ validate ตรวจด้วย Schema ก่อนเรียก Controller
// Controller (ผ่าน asyncHandler) เป็นผู้ประสานงานกับ Service; Route นี้ไม่เรียก Service โดยตรง
// GET /students -> validate(query: listStudentsQuerySchema) -> asyncHandler(studentController.list)
studentsRouter.get(
  "/",
  validate({ query: listStudentsQuerySchema }),
  asyncHandler(studentController.list),
);

// GET /students/:id -> validate(params: studentIdParamSchema) -> asyncHandler(studentController.getById)
studentsRouter.get(
  "/:id",
  validate({ params: studentIdParamSchema }),
  asyncHandler(studentController.getById),
);

// POST /students — ตรวจข้อมูลใน body ด้วย createStudentSchema แล้วส่งต่อให้ controller.create เพื่อสร้างนักเรียน
studentsRouter.post(
  "/",
  validate({ body: createStudentSchema }),
  asyncHandler(studentController.create),
);

// PATCH /students/:id — ตรวจทั้ง id และ body ด้วย schemas ที่กำหนด แล้วส่งต่อให้ controller.update เพื่อแก้ไขข้อมูลนักเรียน
studentsRouter.patch(
  "/:id",
  validate({ params: studentIdParamSchema, body: updateStudentSchema }),
  asyncHandler(studentController.update),
);

// DELETE /students/:id — ตรวจค่า id ใน URL ด้วย studentIdParamSchema แล้วส่งต่อให้ controller.remove เพื่อลบนักเรียน
studentsRouter.delete(
  "/:id",
  validate({ params: studentIdParamSchema }),
  asyncHandler(studentController.remove),
);