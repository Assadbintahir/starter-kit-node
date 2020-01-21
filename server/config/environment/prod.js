// Production specific configuration
// ==================================
export default {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/campster-prod',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  seedDB: false,
};
