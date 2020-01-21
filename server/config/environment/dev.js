// Development specific configuration
// ==================================
export default {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/campster-dev',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  seedDB: false,
};
