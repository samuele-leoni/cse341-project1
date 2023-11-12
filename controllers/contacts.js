const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getById = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contact = {
        email: req.body.email,
        birthday: req.body.birthday,
        favoriteColor: req.body.favoriteColor,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if(response.acknowledged) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        email: req.body.email,
        birthday: req.body.birthday,
        favoriteColor: req.body.favoriteColor,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if(response.modifiedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact');
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if(response.deletedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact');
    }
};

module.exports = {
    getAll,
    getById,
    createContact,
    updateContact,
    deleteContact
};