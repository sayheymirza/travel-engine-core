import { Router } from "express";
// middleware
import { MiddlewareValidateBody } from "@core/middleware";
import { MiddlewareSearchSchema } from "@middlewares/search";
// core
import Module from "@core/module/parrent";

const router = Router();

/**
 * POST /api/v1/search
 * @tags search
 * @summary Search from modules
 * @param {SearchInput} request.body.required Search input data
 * @return {Response} 200 - Search result
 * @example request - Empty
 * {
  "passengers": {
    "adult": 1,
    "child": 0,
    "infant": 0
  },
  "trip": "go",
  "ways": [
    {
      "departure": {
        "year": 1401,
        "month": 0,
        "day": 0,
        "format": "jalali"
      },
      "origin": {
        "value": "THR",
        "text": "string"
      },
      "destination": {
        "value": "string",
        "text": "string"
      }
    }
  ]
}
 * @example request - THR-KIH 1401/09/02
 * {
  "passengers": {
    "adult": 1,
    "child": 0,
    "infant": 0
  },
  "trip": "go",
  "ways": [
    {
      "departure": {
        "year": 1401,
        "month": 9,
        "day": 2,
        "format": "jalali"
      },
      "origin": {
        "value": "THR",
        "text": "string"
      },
      "destination": {
        "value": "KIH",
        "text": "string"
      }
    }
  ]
}
 */
router.post("/", MiddlewareValidateBody(MiddlewareSearchSchema), async (req, res) => {
	try {
		const input = req.body;

		// ask for what module have to search and use

		const result = await Module.search({
			data: input,
			modules: ['sepehr'],
		});

		res.json({
			status: true,
			code: 200,
			count: result.data.length,
			data: result,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			code: 500,
			error: 1,
			message: "Unhandled server error",
		});
	}
});

/**
 * Format Search Input Passengers
 * @typedef {object} SearchInputPassengers
 * @property {number} adult.required - Adult passengers count
 * @property {number} child - Child passengers count
 * @property {number} infant - Infant passengers count
 */

/**
 * Format Search Input Way
 * @typedef {object} SearchInputWay
 * @property {DateTime} departure.required - Date of departure way
 * @property {VTLocation} origin.required - Origin location
 * @property {VTLocation} destination.required - Destination location
 */

/**
 * Format Search Input
 * @typedef {object} SearchInput
 * @property {SearchInputPassengers} passengers.required - Passengers count
 * @property {string} trip.required - Trip type is 'go' or 'go-back'
 * @property {array<SearchInputWay>} ways.required - Ways
 */

export default router;
