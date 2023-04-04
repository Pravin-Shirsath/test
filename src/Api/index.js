import axios from "axios";
import { BASE_MI, BASE_URL, Guest_Auth_Token } from "./APIConst";

export default axios.create({
  baseURL: "https://reactify.theironnetwork.org/data/",
  timeout: 2000,
});

/**
 *
 * @param {*} name
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const register = (name, email, password) => {
  console.log("Before Registration :", name, email, password);

  return axios
    .post(
      `${BASE_URL}/api/version_0/authentication/register/`,
      {
        username: name,
        email: email,
        password: password,
      },
      {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "GUEST-AUTH-TOKEN": "b6d18755-3766-4487-9029-b540ae24d054",
        },
      }
    )
    .then((res) => {
      console.log("Registration :", res);
      return res;
    });
};

/**
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
export const login = (username, password) => {
  // console.log("Before Login :", username,password);

  return axios
    .post(
      `${BASE_URL}/api/version_0/authentication/knox-login/`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "GUEST-AUTH-TOKEN": "b6d18755-3766-4487-9029-b540ae24d054",
        },
      }
    )
    .then((res) => {
      console.log("Login :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @returns
 */
export const profileInfo = (token) => {
  // console.log("IN profile API :", token);
  return axios
    .get(`${BASE_URL}/api/version_0/users/profile-details/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("profile :", res);
      return res;
    });
};

/**
 * This Api Updated  Profile Info
 * @param {*} name
 * @param {*} email
 * @param {*} phone
 * @param {*} token
 * @param {*} id
 * @returns
 */

export const updateProfileInfo = (FormData, token, id) => {
  return axios
    .patch(`${BASE_URL}/api/version_0/admin/customer/update/${id}/`, FormData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      // console.log("Update Profile :",res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @returns
 */
export const logOut = (token) => {
  return axios
    .post(
      `${BASE_URL}/api/version_0/authentication/knox-logout/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log("Log out :",res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */
export const CustomerDisable = (token, userid) => {
  return axios
    .get(`${BASE_URL}/api/version_0/admin/customer/delete/${userid}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Delete customer details :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */
export const CustomerEnable = (token, userid) => {
  return axios
    .post(
      `${BASE_URL}/api/version_0/admin/customer/delete/${userid}/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("Delete customer details :", res);
      return res;
    });
};

/**  Admin Coupan List
 *
 *
 * @param {*} token
 * @param {*} pageNumber
 * @returns
 */

export const AdminCoupanList = (token, pageNumber) => {
  return axios
    .get(`${BASE_URL}/api/automaton/coupons/view/?page=${pageNumber}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("coupan details :", res);
      return res;
    });
};

/**    Company Admin SECTION  Start*/

/**
 *
 * @param {*} token
 *
 * @returns
 */
export const AddUserIn_Company = (token, email, username) => {
  let params = {
    email: email,
    username: username,
  };

  return axios
    .post(`${BASE_URL}/api/version_0//users/create-company-users/`, params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("coupan create :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @returns
 */
export const getCompanyUserList = (token, pageNumber) => {
  return axios
    .get(`${BASE_URL}/api/version_0/users/company-users/?page=${pageNumber}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      // console.log("Log out :",res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} searchItem
 * @returns
 */
export const getsearchCompanyUser = (token, searchItem) => {
  return axios
    .get(
      `${BASE_URL}/api/version_0/users/company-users/?search=${searchItem}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      return res;
    });
};

/**    Company Admin SECTION END */

/**    Admin SECTION */

/**
 *
 * @param {*} token
 * @returns
 */
export const getCustomerList = (token, pageNumber) => {
  return axios
    .get(`${BASE_URL}/api/version_0/admin/customer/list/?page=${pageNumber}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      // console.log("Log out :",res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} searchItem
 * @returns
 */
export const getSearchedCustomer = (token, searchItem) => {
  return axios
    .get(
      `${BASE_URL}/api/version_0/admin/customer/list/?search=${searchItem}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      return res;
    });
};

/**  Admin Coupan List seach
 *
 *
 * @param {*} token
 * @param {*} pageNumber
 * @returns
 */

export const AdminCoupanSearch = (token, searchItem) => {
  return axios
    .get(`${BASE_URL}/api/automaton/coupons/view/?search=${searchItem}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("coupan details SEARCH:", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 *
 * @returns
 */
export const CreateNewCoupan = (token, coupanCode, value, type, des) => {
  let params = {
    coupon_text: coupanCode,
    discount_value: value,
    discount_type: type,
    description: des,
  };

  return axios
    .post(`${BASE_URL}/api/automaton/coupons/create/`, params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("coupan create :", res);
      return res;
    });
};

/**  Admin Low Data  Available user List
 *
 *
 * @param {*} token
 * @param {*} pageNumber
 * @returns
 */

export const LowDataAvilableUser = (token, pageNumber) => {
  return axios
    .get(
      `${BASE_URL}/api/version_0/admin/customer/low-data-list/?page=${pageNumber}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("low data use details :", res);
      return res;
    });
};

/**  Admin Coupan List Search
 *
 *
 * @param {*} token
 * @param {*} pageNumber
 * @returns
 */

export const SearchLowDataAvilableUser = (token, searchItem) => {
  return axios
    .get(
      `${BASE_URL}/api/version_0/admin/customer/low-data-list/?search=${searchItem}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("low data user details SEARCH:", res);
      return res;
    });
};

/**    Admin SECTION END */

/**    Customer SECTION Start */

/**
 *  Get user Account Status
 * @param {*} token
 * @returns
 */

export const UserAccountStatus = (token) => {
  return axios
    .get(`${BASE_URL}/api/version_0/users/account-status/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      // console.log("Log out :",res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */

export const GetAlLProjectList = (token, pageNumber) => {
  return axios
    .get(`${BASE_URL}/api/automaton/projects/view/?page=${pageNumber}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Delete customer details :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */

export const GetSearchProjectList = (token, searchItem) => {
  return axios
    .get(`${BASE_URL}/api/automaton/projects/view/?search=${searchItem}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Delete customer details :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} projectId
 * @returns
 */

export const DeleteProject2 = (token, projectId) => {
  console.log(projectId, "projectId");
  let payload = {
    project_id: projectId + "",
  };

  return axios
    .delete(
      `${BASE_URL}/api/automaton/projects/delete/${52}`,

      {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("Delete customer details :", res);
      return res;
    });
};

/**
 * 
 * @param {*} token 
 * @param {*} projectId 

 * @returns 
 */
export const DeleteProject = (token, projectId) => {
  let params = {
    project_id: projectId + "",
  };

  return fetch(`${BASE_URL}/api/automaton/projects/delete/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: JSON.stringify(params),
  }).then((res) => res);
};

/**
 *
 * @param {*} token
 * @param {*} formdata
 * @returns
 */

export const EditProjectDetails = (token, formdata, projectId) => {
  return axios
    .patch(
      `${BASE_URL}/api/automaton/projects/update/${projectId}/`,
      formdata,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("EditProjectDetails :", res);
      return res;
    });
};

/**
 *  create project
 * @param {*} token
 * @returns
 */

export const CreateNewProject = (
  token,
  projectName,
  dataset,
  projectDes,
  objImage
) => {
  const fd = new FormData();
  if (projectName != "") {
    fd.append("project_name", projectName);
  }
  if (dataset != "") {
    fd.append("dataset_name", dataset);
  }
  if (projectDes != "") {
    fd.append("project_description", projectDes);
  }
  if (objImage != null) {
    fd.append("project_image", objImage);
  }

  console.log(JSON.stringify(fd));

  return axios
    .post(`${BASE_URL}/api/automaton/projects/create/`, fd, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    });
};

/**    Customer SECTION END */

/**
 *
 * @param {*} token
 * @param {*} username
 * @param {*} email
 * @param {*} firstname
 * @param {*} lastname
 * @returns
 */
export const addNewCustomer = (
  token,
  username,
  email,
  firstname,
  lastname,
  mobilenumber
) => {
  return axios
    .post(
      `${BASE_URL}/version_0/admin/customer/add/`,
      {
        username: username,
        email: email,
        first_name: firstname,
        last_name: lastname,
        mobile_number: mobilenumber,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("Login :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */
export const viewCustomerDetails = (token, userid) => {
  return axios
    .get(`${BASE_URL}/version_0/admin/customer/details/${userid}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("CustomerDetailsNew :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @param {*} firstname
 * @param {*} lastname
 * @param {*} mobilenumber
 * @returns
 */

export const updateCustomerDetails = (
  token,
  firstname,
  lastname,
  mobilenumber,
  userid
) => {
  console.log("Update details", userid, firstname, lastname, mobilenumber);
  return axios
    .patch(
      `${BASE_URL}/version_0/admin/customer/update/${userid}/`,
      {
        first_name: firstname,
        last_name: lastname,
        mobile_number: mobilenumber,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("updated customer details :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */
export const deleteCustomerDetails = (token, userid) => {
  return axios
    .get(`${BASE_URL}/api/version_0/admin/customer/delete/${userid}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Delete customer details :", res);
      return res;
    });
};

// Added by vish
// Get admins list api
/**
 *
 * @param {*} token
 * @param {*} pageNumber
 * @returns
 */
export const getAdminList = (token, pageNumber) => {
  return axios
    .get(`${BASE_URL}/version_0/admin/admin/list/?page=${pageNumber}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Log out :", res);
      return res;
    });
};

// getSearched admin list api is not prepared like customers list
/**
 *
 * @param {*} token
 * @param {*} searchItem
 * @returns
 */
export const getSearchedAdmin = (token, searchItem) => {
  return axios
    .get(`${BASE_URL}/version_0/admin/admin/list/?search=${searchItem}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Log out :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} username
 * @param {*} email
 * @param {*} firstname
 * @param {*} lastname
 * @param {*} contactnumber
 * @returns
 */
export const addNewAdmin = (
  token,
  username,
  email,
  firstname,
  lastname,
  contactnumber
) => {
  return axios
    .post(
      `${BASE_URL}/version_0/admin/admin/add/`,
      {
        username: username,
        email: email,
        first_name: firstname,
        last_name: lastname,
        mobile_number: contactnumber,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("Login :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */
export const viewAdminDetails = (token, userid) => {
  return axios
    .get(`${BASE_URL}/version_0/admin/admin/details/${userid}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Login :", res);
      return res;
    });
};

// Update admin api call
/**
 *
 * @param {*} token
 * @param {*} firstname
 * @param {*} lastname
 * @param {*} contactnumber
 * @param {*} userid
 * @returns
 */
export const updateAdminDetails = (
  token,
  firstname,
  lastname,
  contactnumber,
  userid
) => {
  console.log(
    "Update details",
    userid,
    firstname,
    lastname,
    contactnumber,
    "on clicking updateee updated details"
  );
  return axios
    .patch(
      `${BASE_URL}/version_0/admin/admin/update/${userid}/`,
      {
        first_name: firstname,
        last_name: lastname,
        mobile_number: contactnumber,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("updated customer details :", res);
      return res;
    });
};

/**
 *
 * @param {*} token
 * @param {*} userid
 * @returns
 */
export const deleteAdminDetails = (token, userid) => {
  return axios
    .get(`${BASE_URL}/version_0/admin/admin/delete/${userid}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Delete admin details :", res);
      return res;
    });
};

//========================= MODAL API HANDLINGS ======================//

// create modal API

/**
 *
 * @param {*} token
 * @param {*} options
 * @param {*} timeVariable
 * @param {*} dependentVariable
 * @param {*} promotionalDrivers
 * @param {*} nonPromotionalDrivers
 * @param {*} csvFile
 * @returns
 */
export const createModal = (
  token,
  options,
  timeVariable,
  dependentVariable,
  promotionalDrivers,
  nonPromotionalDrivers,
  csvFile
) => {
  const fd = new FormData();
  fd.append("time_variable", timeVariable);
  fd.append("input_csv", csvFile);
  fd.append("dependent_variable", dependentVariable);
  fd.append("promotional_drivers", promotionalDrivers);
  fd.append("non_promotional_drivers", nonPromotionalDrivers);
  fd.append("csv_headers", options);

  return axios
    .post(`${BASE_URL}/version_0/sales/modal/create/`, fd, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("create modal res :", res);
      return res;
    });
};

// Update modal API
/**
 *
 * @param {*} id
 * @param {*} token
 * @param {*} options
 * @param {*} timeVariable
 * @param {*} dependentVariable
 * @param {*} promotionalDrivers
 * @param {*} nonPromotionalDrivers
 * @param {*} csvFile
 * @returns
 */
export const updateDataModal = (
  id,
  token,
  options,
  timeVariable,
  dependentVariable,
  promotionalDrivers,
  nonPromotionalDrivers,
  csvFile
) => {
  const fd = new FormData();
  fd.append("time_variable", timeVariable);
  fd.append("input_csv", csvFile);
  fd.append("dependent_variable", dependentVariable);
  fd.append("promotional_drivers", promotionalDrivers);
  fd.append("non_promotional_drivers", nonPromotionalDrivers);
  fd.append("csv_headers", options);

  return axios
    .patch(`${BASE_URL}/version_0/sales/modal/update/${id}/`, fd, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("create modal res :", res);
      return res;
    });
};

// For modal list display
/**
 *
 * @param {*} token
 * @param {*} pageNumber
 * @returns
 */
export const getModalList = (token, pageNumber) => {
  return axios
    .get(`${BASE_URL}/version_0/sales/modal/list/?page=${pageNumber}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("modal data :", res);
      return res;
    });
};

// For delete modal from the list

/**
 *
 * @param {*} token
 * @param {*} modalid
 * @returns
 */
export const deleteModal = (token, modalid) => {
  return axios
    .get(`${BASE_URL}/version_0/sales/modal/delete/${modalid}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Delete modal details :", res);
      return res;
    });
};

// for modal search (yet there is no API, this is just dummy)

export const getSearchedModal = (token, searchItem) => {
  return axios
    .get(`${BASE_URL}/version_0/sales/modal/list/?search=${searchItem}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log("Model update response:", res);
      return res;
    });
};

//========= API FOR SALES SCENARIO PLANNING =======//
/**
 *
 * @param {*} file
 * @param {*} submittedData
 * @returns
 */
export const scenarioPlanning = (token, file, submittedData) => {
  return axios
    .post(`${BASE_MI}/v0/sales/scenario_planning/`, {
      uploaded_file: file,
      column_names: submittedData,
    })
    .then((res) => {
      console.log("Scenario planning api response", res);
      return res;
    });
};

//========= API FOR impactable_sales_outcome =======//
export const getImpactableSalesOutcome = () => {
  return axios
    .get(`${BASE_MI}/v1/sales/impactable_sales_outcome/`, {
      // header area, if have to pass data in header
    })
    .then((res) => {
      console.log("Impactable sales outcome", res);
      return res;
    });
};

//=========== API for Link ML API TO Sales Modal =========//
export const postMlDataWithModelRef = (token, modelRef, jsonSendFormat) => {
  return axios
    .post(
      `${BASE_URL}/version_0/sales/modal/link-ml-data/`,
      {
        sales_modal_ref_id: modelRef,
        ml_data: jsonSendFormat,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("response from mlDataModel Api in API list :", res);
      return res;
    });
};

// API For Plotting Graph Data
export const plotGraph = (token, modelRef) => {
  return axios
    .post(
      `${BASE_URL}/version_0/sales/modal/graph/plot/`,
      {
        ref_no: modelRef,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      return res;
    });
};

export const scnerioPlanningPostData = (token, jsonSendFormat) => {
  return axios
    .post(
      `${BASE_URL}/version_0/sales/modal/scenario-planning/graph/plot/`,
      {
        ml_data: jsonSendFormat,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("response from scnerioplanning API :", res);
      return res;
    });
};

// API FOR CREATE DATASET
/**
 *
 * @param {*} token
 * @param {*} projectId
 * @param {*} datasetName
 * @returns
 */


export const createDataset = (authToken, projectId, datasetName) => {
  console.log("Before creating dataset :", typeof(authToken), projectId, datasetName);

 return axios
    .post(
      `${BASE_URL}/api/automaton/datasets/create/`,
      {
        "project_id": projectId,
        "dataset_name": datasetName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${authToken}`,
        },
      }
    )
    .then((res) => {
      console.log("createdd dataset data :", res);
      return res;
    });
};


// API FOR VIEW PROJECT DATASET LIST VIEW
export const getViewProjectDatasets = (authToken, projectId, pageNumber) => {
    return axios.post( `${BASE_URL}/api/automaton/datasets/view/?page=${pageNumber}`,
    {
        "project_id": projectId
    },
    {
        headers:{
            "Content-Type": "application/json",
            Authorization: `token ${authToken}`
        }
    }
    )
    .then(res => {
        console.log("view projects datasets list:", res)
        return res
    })
}