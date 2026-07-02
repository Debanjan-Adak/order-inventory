import axiosClient from "../../../shared/api/axios";

export const getCustomerByEmail = (email) =>
  axiosClient.get("/customers", { params: { email_address: email } });

export const loginCustomer = async ({ email, password }) => {
  const { data } = await getCustomerByEmail(email);
  const customer = data[0];

  if (!customer || customer.password !== password) {
    throw new Error("Incorrect username or password.");
  }

  if (customer.isblocked) {
    throw new Error("This account has been blocked.");
  }

  return customer;
};

export const loginAdmin = async ({ email, password }) => {
  const { data } = await axiosClient.get("/admin", { params: { email } });
  const admin = data[0];

  if (!admin || admin.password !== password) {
    throw new Error("Incorrect username or password.");
  }

  return admin;
};

export const checkEmailExists = async (email) => {
  const { data } = await getCustomerByEmail(email);
  return data.length > 0;
};

export const registerCustomer = async ({ fullName, email, password }) => {
  const emailTaken = await checkEmailExists(email);

  if (emailTaken) {
    const error = new Error("A customer with this email already exists.");
    error.code = "EMAIL_TAKEN";
    throw error;
  }

  const { data: created } = await axiosClient.post("/customers", {
    full_name: fullName,
    email_address: email,
    password,
    isblocked: false
  });

  const { data: customer } = await axiosClient.patch(`/customers/${created.id}`, {
    customer_id: created.id
  });

  return customer;
};

export const updateCustomer = (id, updates) =>
  axiosClient.patch(`/customers/${id}`, updates);