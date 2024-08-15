import createHttpError from "http-errors";
import * as contactsService from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = parsePaginationParams(req.query);
    const { sortBy = "name", sortOrder = "asc" } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const { contacts, ...paginationData } = await contactsService.getAllContacts(
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter
    );

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: {
        data: contacts,
        page: paginationData.page,
        perPage: paginationData.perPage,
        totalItems: paginationData.totalItems,
        totalPages: paginationData.totalPages,
        hasPreviousPage: paginationData.hasPreviousPage,
        hasNextPage: paginationData.hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await contactsService.getContactById(contactId, userId);
    if (!contact) {
      return next(createHttpError(404, "Contact not found"));
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const contactData = { ...req.body, userId: req.user._id };
    const contact = await contactsService.createContact(contactData);
    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: contact.toObject(),
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await contactsService.updateContact(contactId, userId, req.body);
    if (!contact) {
      return next(createHttpError(404, "Contact not found"));
    }
    res.status(200).json({
      status: 200,
      message: "Successfully updated a contact!",
      data: contact.toObject(),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await contactsService.deleteContact(contactId, userId);
    if (!contact) {
      return next(createHttpError(404, "Contact not found"));
    }
    res.status(204).json({
      status: 204,
      message: "Successfully deleted a contact!",
    });
  } catch (error) {
    next(error);
  }
};
