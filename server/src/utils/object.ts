export const omit = <T>(obj: { [key: string]: any }, exclude: Array<keyof T>) => {
	const filteredEntries = Object.entries(obj).filter((e) => !exclude.includes(e[0] as keyof T));
	const newObj = Object.fromEntries(filteredEntries);
	return newObj;
};
