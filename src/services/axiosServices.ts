import { adminEndpoints, authEndpoints } from "./axiosEndpoints";

export const authService = {
  getAllCaseStudy: {
    method: "GET",
    url: authEndpoints.GETALL_CASESTUDY,
  },
  addContact: {
    method: "POST",
    url: authEndpoints.ADD_CONTACT,
  },
  addSubscribeEmail: {
    method: "POST",
    url: authEndpoints.ADD_SUBSCRIBE,
  },
  Login: {
    method: "POST",
    url: authEndpoints.LOGIN,
  },
};

export const adminService = {
  addCaseStudy: {
    method: "POST",
    url: adminEndpoints.ADD_CASESTUDY,
  },
  updateCaseStudy: {
    method: "PUT",
    url: adminEndpoints.UPDATE_CASESTUDY,
  },
  deleteCaseStudy: {
    method: "DELETE",
    url: adminEndpoints.DELETE_CASESTUDY,
  },
  addCaseStudyContent: {
    method: "POST",
    url: adminEndpoints.ADD_CASESTUDY_CONTENT,
  },
  updateCaseStudyContent: {
    method: "PUT",
    url: adminEndpoints.UPDATE_CASESTUDY_CONTENT,
  },
  deleteCaseStudyContent: {
    method: "DELETE",
    url: adminEndpoints.DELETE_CASESTUDY_CONTENT,
  },
  addCaseGallery: {
    method: "POST",
    url: adminEndpoints.ADD_CASESTUDY_GALLERY,
  },
  updateCaseGallery: {
    method: "PUT",
    url: adminEndpoints.UPDATE_CASESTUDY_GALLERY,
  },
  deleteCaseGallery: {
    method: "DELETE",
    url: adminEndpoints.DELETE_CASESTUDY_GALLERY,
  },
};
