import assert from "assert";
import functions from "./functions";

describe("should 'functions' be ok", () => {
	it("should 'formatTime' be ok", () => {
		var result = functions.formatTime();
		assert.equal(result, "--:--");
		const date = new Date();
		var result = functions.formatTime(date.toISOString());
		const hour = date.getHours();
		const minute = date.getMinutes();
		assert.equal(result, `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`);
	});

	it("should 'formatDuration' be ok", () => {
		const start = new Date();
		const end = new Date();
		end.setMinutes(end.getMinutes() + 45 * 2);
		var result = functions.formatDuration();
		assert.equal(result, "--:--");
		var result = functions.formatDuration(start.toISOString(), end.toISOString(), "short");
		assert.equal(result, "01:30");
		var result = functions.formatDuration(start.toISOString(), end.toISOString(), "long");
		assert.equal(result, "1 ساعت و 30 دقیقه");
	});

	it("should 'formatDate' be ok", () => {
		var result = functions.formatDate(new Date("11/18/2022 00:00").toISOString());
		assert.equal(result, "1401/08/27");
		var result = functions.formatDate(new Date("11/18/2022 00:00").toISOString(), "en");
		assert.equal(result, "2022/11/18");
		var result = functions.formatDate(new Date("11/18/2022 00:00").toISOString(), "fa", "MMMM");
		assert.equal(result, "آبان");
	});

	it("should 'formatDateTime' be ok", () => {
		var result = functions.formatDateTime(
			{
				year: 1401,
				month: 8,
				day: 27,
				format: "jalali",
			},
			"YYYY/MM/DD"
		);
		assert.equal(result, "2022/11/18");
	});

	it("should 'statusOfRemaining' be ok", () => {
        assert.equal(functions.statusOfRemaining(), "unnormal")
        assert.equal(functions.statusOfRemaining(null), "unnormal")
        assert.equal(functions.statusOfRemaining(0), "empty")
        assert.equal(functions.statusOfRemaining(2), "low")
        assert.equal(functions.statusOfRemaining(3), "low")
        assert.equal(functions.statusOfRemaining(5), "medium")
        assert.equal(functions.statusOfRemaining(7), "high")
        assert.equal(functions.statusOfRemaining(9), "high")
        assert.equal(functions.statusOfRemaining(13), "normal")
    });
});
