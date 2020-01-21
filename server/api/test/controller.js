import { test } from '../../../lib';

export const helloWorld = async (req, res, next) => {
  try {
    const result = await test.indexTest('Asad');
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
