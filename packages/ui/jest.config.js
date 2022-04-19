module.exports = {
	roots: ['./src'],
	moduleFileExtensions: ['js', 'jsx','ts', 'tsx'],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
		'<rootDir>/test/**/__tests__/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/test/**/*.{spec,test}.{js,jsx,ts,tsx}'
	],
	setupFiles: [],
	setupFilesAfterEnv: [],
	transform: {
		"^.+\\.(t|j)sx?$": ["@swc/jest"],
	},
}
