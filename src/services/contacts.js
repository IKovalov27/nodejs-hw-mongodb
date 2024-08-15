import { ContactCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async (userId, page, perPage, sortBy, sortOrder, filter) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where("contactType").equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const [totalItems, contacts] = await Promise.all([
    contactsQuery.clone().countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
};

export const countContacts = async (userId, filter) => {
  const contactsQuery = ContactCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where("contactType").equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }

  return await contactsQuery.countDocuments();
};

export const getContactById = async (contactId, userId) => {
  return await ContactCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (payload) => {
  return await ContactCollection.create(payload);
};

export const updateContact = async (contactId, userId, contactData) => {
  return await ContactCollection.findOneAndUpdate({ _id: contactId, userId }, contactData, { new: true });
};

export const deleteContact = async (contactId, userId) => {
  return await ContactCollection.findOneAndDelete({ _id: contactId, userId });
};
