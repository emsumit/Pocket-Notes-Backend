const mongoose = require("mongoose");
const Group = require("../models/notes");

const createGroup = async (req, res, next) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).send(group);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    await group.deleteOne();
    res.status(204).json({ message: "Group deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllGroupData = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByIdAndUpdate(groupId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createGroup,
  deleteGroup,
  getAllGroupData,
  updateGroup,
};
