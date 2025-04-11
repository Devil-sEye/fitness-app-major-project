const NutritionLog = require('../models/NutritionLog');

// Controller function to create a new nutrition log entry
exports.createNutritionLog = async (req, res) => {
  try {
    const { userId, date, mealType, foodItems, totalCalories } = req.body;

    const newLog = new NutritionLog({
      userId,
      date,
      mealType,
      foodItems,
      totalCalories,
    });

    const savedLog = await newLog.save();

    res.status(201).json({ message: 'Nutrition log created successfully', log: savedLog });

  } catch (error) {
    console.error('Error creating nutrition log:', error);
    res.status(500).json({ message: 'Failed to create nutrition log' });
  }
};


 exports.getNutritionLogsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const getLogs = await NutritionLog.find({ userId });
      

      if (!getLogs) {
        return res.status(404).json({ message: 'No nutrition logs found for this user' });
      }
      res.status(200).json(getLogs);
 }
    catch (error) {
      console.error('Error fetching nutrition logs:', error);
      res.status(500).json({ message: 'Failed to fetch nutrition logs' });
    }
  };
 exports.updateNutritionLog = async (req, res) => {
    try {
      const logId = req.params.logId;
      const updatedData = req.body;

      const updatedLog = await NutritionLog.findByIdAndUpdate(logId, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!updatedLog) {
        return res.status(404).json({ message: 'Nutrition log not found' });
      }

      res.status(200).json({ message: 'Nutrition log updated successfully', log: updatedLog });
    } catch (error) {
      console.error('Error updating nutrition log:', error);
      res.status(500).json({ message: 'Failed to update nutrition log' });
    }
  };
 exports.deleteNutritionLog = async (req, res) => { 
    try {
      const logId = req.params.logId;
      const deletedLog = await NutritionLog.findByIdAndDelete(logId);

      if (!deletedLog) {
        return res.status(404).json({ message: 'Nutrition log not found' });
      }

      res.status(200).json({ message: 'Nutrition log deleted successfully' });
    } catch (error) {
      console.error('Error deleting nutrition log:', error);
      res.status(500).json({ message: 'Failed to delete nutrition log' });
    }
 };