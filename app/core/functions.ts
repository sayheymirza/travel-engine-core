import moment from "jalali-moment";
import { IDateTime, TRemainingStatus } from "../interfaces/common";

export default {
	formatTime: (time?: string) => {
		if (time == undefined || time.length == 0) return "--:--";
		else return moment(time).format("HH:mm");
	},

	formatDuration: (start?: string, end?: string, format: "short" | "long" = "short") => {
		if (start == undefined || start.length == 0 || end == undefined || end.length == 0) return format == "short" ? "--:--" : "";
		else {
			const _start = moment(start);
			const _end = moment(end);

			const duration = moment.duration(_end.diff(_start)).abs();

			if (format == "short") {
				return `${duration.hours() <= 9 ? "0" + duration.hours().toString() : duration.hours()}:${duration.minutes() <= 9 ? "0" + duration.minutes().toString() : duration.minutes()}`;
			} else {
				return [duration.days() ? duration.days() + " روز" : "", duration.hours() ? duration.hours() + " ساعت" : "", duration.minutes() ? duration.minutes() + " دقیقه" : ""]
					.filter((item) => item.length != 0)
					.join(" و ")
					.trim();
			}
		}
	},

	formatDate: (date: string, locale: string = "fa", format: string = "YYYY/MM/DD") => moment(date).locale(locale).format(format),

	formatDateTime: (date: IDateTime, format: string = "YYYY-MM-DD") => moment(`${date!.year}/${date!.month}/${date!.day}`, date!.format == "jalali" ? "jYYYY/jM/jD" : "YYYY/M/D").format(format),

	statusOfRemaining: (count?: number | null): TRemainingStatus => {
		if (count == null || count == undefined) return "unnormal";
		if (count == 0) return "empty";
		if (count <= 3) return "low";
		if (3 < count && count <= 6) return "medium";
		if (6 < count && count <= 9) return "high";
		return "normal";
	},
};
