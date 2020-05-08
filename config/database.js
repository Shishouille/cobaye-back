import mongoose from 'mongoose';

export default async function(connectionString) {
  const deprecationOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  let isConnected = false;

  // loop to retry connection
  while (!isConnected) {
    try {
      console.info("\x1b[33m", 'Connecting to mongo...');

      await mongoose.connect(connectionString, deprecationOptions);
      isConnected = true;

      console.info("\x1b[32m", 'Mongo connected !');
    }
    catch (err) {
      console.error("\x1b[31m", `Failed to connect : ${err}, retry in 10s`);

      await new Promise((resolve) => {
        setTimeout(resolve, 10000);
      });
    }
  }
}
