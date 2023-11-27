import { closeServerAndDB } from './server.js';

// Global after hook to close the server after all tests
after((done) => {
    closeServerAndDB();
    done();
});