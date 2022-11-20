import { Router } from "express";
// routes
import modules from "./modules";
import search from "./search";
import revalidate from "./revalidate";

import logs from "./logs";
import auth from "./auth";

const router = Router();

router.use("/module", modules);
router.use("/search", search);
router.use("/revalidate", revalidate);

router.use("/log", logs);
router.use("/auth", auth);

export default router;

/**
 * Response
 * @typedef {object} Response
 * @property {boolean} status.required - Status was ok or not ok
 * @property {number} code.required - HTTP response code
 * @property {number} error - API error code
 * @property {string} message - API message
 */

/**
 * Date Time
 * @typedef {object} DateTime
 * @property {number} year.required - Year
 * @property {number} month.required - Month
 * @property {number} day.required - Day
 * @property {string} format.required - 'jalali' or 'gregorian'
 */

/**
 * VT Location
 * @typedef {object} VTLocation
 * @property {string} value.required - Location value
 * @property {string} text - Location text
 */
