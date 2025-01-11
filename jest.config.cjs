module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom', // Ensure this matches the installed package
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
