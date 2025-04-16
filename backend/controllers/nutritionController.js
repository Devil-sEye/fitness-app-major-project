

const NutritionLog = require('../models/NutritionLog');

// Create a new nutrition log
exports.createNutritionLog = async (req, res) => {
  try {
    const { userId, date, mealType, foodItems, totalCalories } = req.body;
    const newLog = new NutritionLog({ userId, date, mealType, foodItems, totalCalories });
    const savedLog = await newLog.save();
    res.status(201).json({ message: 'Nutrition log created successfully', log: savedLog });
  } catch (error) {
    console.error('Error creating nutrition log:', error);
    res.status(500).json({ message: 'Failed to create nutrition log' });
  }
};

// Get a nutrition log by ID
exports.getNutritionLogById = async (req, res) => {
  try {
    const { logId } = req.params;
    const log = await NutritionLog.findById(logId);
    if (!log) return res.status(404).json({ message: 'Nutrition log not found' });
    res.status(200).json(log);
  } catch (error) {
    console.error('Error fetching nutrition log:', error);
    res.status(500).json({ message: 'Failed to fetch nutrition log' });
  }
};

// Update a nutrition log
exports.updateNutritionLog = async (req, res) => {
  try {
    const { logId } = req.params;
    const updatedLog = await NutritionLog.findByIdAndUpdate(logId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedLog) return res.status(404).json({ message: 'Nutrition log not found' });
    res.status(200).json({ message: 'Nutrition log updated successfully', log: updatedLog });
  } catch (error) {
    console.error('Error updating nutrition log:', error);
    res.status(500).json({ message: 'Failed to update nutrition log' });
  }
};

// Delete a nutrition log
exports.deleteNutritionLog = async (req, res) => {
  try {
    const { logId } = req.params;
    const deletedLog = await NutritionLog.findByIdAndDelete(logId);
    if (!deletedLog) return res.status(404).json({ message: 'Nutrition log not found' });
    res.status(200).json({ message: 'Nutrition log deleted successfully' });
  } catch (error) {
    console.error('Error deleting nutrition log:', error);
    res.status(500).json({ message: 'Failed to delete nutrition log' });
  }
};

// Get nutrition logs with dynamic filters
exports.getFilteredNutritionLogs = async (req, res) => {
  try {
    const {
      userId,
      date,
      mealType,
      foodItem,
      minCalories,
      maxCalories,
      startDate,
      endDate
    } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (date) filter.date = date;
    if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    if (mealType) filter.mealType = mealType;
    if (foodItem) filter.foodItems = { $in: [foodItem] };
    if (minCalories && maxCalories) {
      filter.totalCalories = { $gte: parseInt(minCalories), $lte: parseInt(maxCalories) };
    }

    const logs = await NutritionLog.find(filter);
    if (!logs.length) return res.status(404).json({ message: 'No matching nutrition logs found' });
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching filtered nutrition logs:', error);
    res.status(500).json({ message: 'Failed to fetch filtered nutrition logs' });
  }
};
