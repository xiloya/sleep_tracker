const SleepData = require("../models/SleepData");

exports.createSleepData = async (req, res) => {
  try {
    const { userId, date, sleepTime, wakeTime } = req.body;

    const sleep = new Date(sleepTime);
    let wake = new Date(wakeTime);

    if (wake <= sleep) {
      wake.setTime(wake.getTime() + 24 * 60 * 60 * 1000);
    }

    const duration = (wake - sleep) / (1000 * 60 * 60);

    const sleepData = new SleepData({
      userId,
      date,
      sleepTime: sleep,
      wakeTime: wake,
      duration: Math.round(duration * 10) / 10,
    });

    await sleepData.save();

    res.status(201).json({ message: "Sleep data saved", data: sleepData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save sleep data" });
  }
};

exports.getUserSleepData = async (req, res) => {
  try {
    const { userId } = req.params;
    const sleepData = await SleepData.find({ userId }).sort({ date: -1 });
    res.status(200).json(sleepData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sleep data" });
  }
};
