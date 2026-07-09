export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.tests.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
};
