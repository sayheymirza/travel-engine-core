import { Router } from "express";
// middleware
import { MiddlewareValidateBody } from "@core/middleware";
import { MiddlewareSearchSchema } from "@middlewares/search";
// core
import Module from "@core/module/parrent";
// database
import searchDB from "@database/search";

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
 * @example request - THR-KIH 1401/09/10
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
        "day": 10,
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

		const result = await Module.search({
			data: input,
			modules: [ 'faranegar', 'sepehr'],
		});

		res.status(result.code).json(result);
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
 * POST /api/v1/search/lazy
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
 * @example request - THR-KIH 1401/09/10
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
        "day": 10,
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
router.post("/lazy", MiddlewareValidateBody(MiddlewareSearchSchema), async (req, res) => {
	try {
		const input = req.body;

		const result = await Module.searchLazy({
			data: input,
			modules: ['sepehr'],
		});

		if (result) {
			res.json({
				status: true,
				code: 200,
				data: result,
			});
		} else {
			res.status(500).json({
				status: false,
				code: 500,
				error: 2,
				message: "Unable to get a search token",
			});
		}
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
 * GET /api/v1/search/{token}
 * @tags search
 * @summary Get search results with search token
 * @description For lazy loading and fetching fastly you can get search result with search token where you get it with POST request with your input data
 * @return {Result} 200 - All searched data
 * @param {string} token.path.required - Search token
 */
router.get("/:token", async (req, res) => {
	try {
		const data = await searchDB.get(req.params.token);

		if (data != null) {
			res.json({
				status: true,
				code: 200,
				message: "This is all search data from your token",
				data: data,
			});
		} else {
			res.status(404).json({
				status: false,
				code: 404,
				message: "Token must be expired or this token not exists",
			});
		}
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
