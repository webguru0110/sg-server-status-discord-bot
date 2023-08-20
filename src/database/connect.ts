import { connect } from 'mongoose';

const connectToDatabase = async () => {
  await connect(process.env.MONGO_URI);
  console.log('INFO: Database connection established');
};

export default connectToDatabase;
