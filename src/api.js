import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Comapany routes
  
  /**Get list of all companies */
  static async getCompanies(searchTerm) {
    let res = await this.request(`companies?${searchTerm}`,);
    return res.companies
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**Creates  a new company */
  static async createCompany(data) {
    let res = await this.request(`companies`,'post', data);
    return res.company;
  }

  /**Updates a company */
  static async updateCompany(handle, data) {
    let res = await this.request(`companies/${handle}`, 'patch',data);
    return res.company;
  }

  /**Deletes a company */
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}, "delete"`);
    return res;
  }

  // Job Routes

  /**Get List of Jobs */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /**Gets Details on a job */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Create a job */
  static async createJob(data) {
    let res = await  this.request(`jobs`, 'post', data);
    return res.job;
  }

  /**Update a job */
  static async updateJob(handle, data) {
    let res = await this.request(`jobs/${handle}`, 'post', data);
    return res.job;
  }

  /** Delete a job */
  static async deleteJob(handle) {
    let res = await this.request(`jobs/${handle}`, 'delete');
    return res;
  }


  // User Routes

  /** Register a new User */
  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res;
  }

  /** Authenticate a User */
  static async auth(data) {
    let res = await this.request(`auth/token`, data, 'post');
    return res;
  }

  /** Get List of Users */
  static async getUsers() {
    let res = await this.request(`users`);
    return res.jobs;
  }

  /** Get Details on a user */
  static async getUser(handle) {
    let res = await  this.request(`users/${handle}`);
    return res.user;
  }

  /** Create new user */
  static async createUser(data) {
    let res = this.request(`/users`, 'post', data);
    return res.user;
  }

  /** Update a user */
  static async updateUser(handle, data) {
    let res = await this.request(`users/${handle}`, data, 'patch');
    return res.user;
  }

  /** Deletes user */
  static async deleteUser(handle) {
    let res = await this.request(`/users/${handle}`, 'delete');
    return res;
  }
 
  /** Apply for job */
  static async apply(username, id, data) {
    let res = await this.request(`users/${username}/jobs/${id}`, data,"post");
    return res;
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;